import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const NextDigiHomeApp());
}

const _accent = Color(0xFF00D4AA);
const _secondary = Color(0xFF8B5CF6);
const _background = Color(0xFF0F0F12);
const _card = Color(0xFF1A1A1F);
const _border = Color(0xFF2A2A30);
const _muted = Color(0xFF8B8B91);

String taka(num amount) => '৳${amount.toStringAsFixed(2)}';

class NextDigiHomeApp extends StatefulWidget {
  const NextDigiHomeApp({super.key});

  @override
  State<NextDigiHomeApp> createState() => _NextDigiHomeAppState();
}

class _NextDigiHomeAppState extends State<NextDigiHomeApp> {
  final AppState appState = AppState(ApiClient());

  @override
  void initState() {
    super.initState();
    appState.bootstrap();
  }

  @override
  Widget build(BuildContext context) {
    return AppScope(
      state: appState,
      child: MaterialApp(
        title: 'Next Digi Home',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.dark,
          scaffoldBackgroundColor: _background,
          colorScheme: ColorScheme.fromSeed(
            seedColor: _accent,
            brightness: Brightness.dark,
            surface: _card,
          ),
          useMaterial3: true,
          appBarTheme: const AppBarTheme(
            backgroundColor: _background,
            foregroundColor: Colors.white,
            centerTitle: false,
          ),
          cardTheme: CardThemeData(
            color: _card,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
              side: const BorderSide(color: _border),
            ),
          ),
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: const Color(0xFF141418),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: const BorderSide(color: _border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: const BorderSide(color: _border),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(14),
              borderSide: const BorderSide(color: _accent),
            ),
          ),
        ),
        home: const ShellScreen(),
      ),
    );
  }
}

class AppScope extends InheritedNotifier<AppState> {
  const AppScope({required this.state, required super.child, super.key})
      : super(notifier: state);

  final AppState state;

  static AppState of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<AppScope>();
    assert(scope != null, 'AppScope not found');
    return scope!.state;
  }
}

class AppState extends ChangeNotifier {
  AppState(this.api);

  final ApiClient api;
  bool ready = false;
  List<Product> products = [];
  List<CartItem> cart = [];
  UserProfile? user;

  bool get isSignedIn => api.token != null && api.token!.isNotEmpty;
  int get cartCount => cart.fold(0, (sum, item) => sum + item.quantity);
  double get subtotal => cart.fold(0, (sum, item) => sum + item.total);

  Future<void> bootstrap() async {
    await api.loadToken();
    await Future.wait([loadProducts(), if (isSignedIn) loadUserAndCart()]);
    ready = true;
    notifyListeners();
  }

  Future<void> loadProducts() async {
    final response = await api.get('products?per_page=50');
    final list = response is Map ? response['data'] : response;
    products = (list is List)
        ? list.map((item) => Product.fromJson(asMap(item))).toList()
        : [];
    notifyListeners();
  }

  Future<void> loadUserAndCart() async {
    await Future.wait([loadUser(), loadCart()]);
  }

  Future<void> loadUser() async {
    if (!isSignedIn) return;
    try {
      final response = await api.get('/user', auth: true);
      user = UserProfile.fromJson(asMap(response['user'] ?? response));
    } catch (_) {
      await logout();
    }
    notifyListeners();
  }

  Future<void> login(String email, String password) async {
    final response = await api.post('login', {
      'email': email,
      'password': password,
    });
    final token = response['token']?.toString();
    if (token == null || token.isEmpty) {
      throw ApiException('Login succeeded but no token was returned.');
    }
    await api.saveToken(token);
    await loadUserAndCart();
  }

  Future<void> register({
    required String name,
    required String email,
    required String phone,
    required String password,
  }) async {
    await api.post('register', {
      'name': name,
      'email': email,
      'phone': phone,
      'password': password,
      'password_confirmation': password,
    });
  }

  Future<void> logout() async {
    await api.clearToken();
    user = null;
    cart = [];
    notifyListeners();
  }

  Future<void> loadCart() async {
    if (!isSignedIn) return;
    final response = await api.get('/cart', auth: true);
    final items = response['items'];
    cart = (items is List)
        ? items.map((item) => CartItem.fromJson(asMap(item))).toList()
        : [];
    notifyListeners();
  }

  Future<void> addToCart(Product product) async {
    if (!isSignedIn) throw ApiException('Please sign in before adding items.');
    await api.post('/cart', {
      'product_id': product.id,
      'quantity': 1,
    }, auth: true);
    await loadCart();
  }

  Future<void> updateCartItem(CartItem item, int quantity) async {
    if (quantity < 1) return;
    await api.put('/cart/${Uri.encodeComponent(item.id)}', {
      'quantity': quantity,
    }, auth: true);
    await loadCart();
  }

  Future<void> removeCartItem(CartItem item) async {
    await api.delete('/cart/${Uri.encodeComponent(item.id)}', auth: true);
    await loadCart();
  }

  Future<String> placeOrder(CheckoutForm form) async {
    final orderItems = cart
        .map((item) => {
              'product_id': item.productId,
              'quantity': item.quantity,
              'purchase_type': item.purchaseType,
              'validity_days': item.validityDays,
            })
        .toList();
    final response = await api.post('/checkout', {
      'customer_name': form.name,
      'customer_email': form.email,
      'customer_phone': form.phone,
      'payment_method': form.paymentMethod,
      'notes': form.notes,
      'items': jsonEncode(orderItems),
    }, auth: true);
    return transactionFrom(response) ?? 'ORDER-${DateTime.now().millisecondsSinceEpoch}';
  }

  Future<void> verifyPayment({
    required String orderTransactionId,
    required String paymentTransactionId,
    required String senderNumber,
    required String paymentMethod,
    required String notes,
    File? proof,
  }) async {
    final fields = {
      'transaction_id': orderTransactionId,
      'order_transaction_id': orderTransactionId,
      'order_reference': orderTransactionId,
      'payment_transaction_id': paymentTransactionId,
      'payment_trx_id': paymentTransactionId,
      'gateway_transaction_id': paymentTransactionId,
      'sender_number': senderNumber,
      'payment_method': paymentMethod,
      if (notes.trim().isNotEmpty) 'notes': notes.trim(),
    };
    await api.multipart('/checkout/verify', fields: fields, file: proof, auth: true);
    await api.delete('/cart', auth: true);
    cart = [];
    notifyListeners();
  }
}

class ApiClient {
  static const baseUrl = 'https://backend.nextdigihome.com';
  static const apiBase = '$baseUrl/api';
  String? token;

  Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    token = prefs.getString('auth_token');
  }

  Future<void> saveToken(String value) async {
    token = value;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('auth_token', value);
  }

  Future<void> clearToken() async {
    token = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
  }

  Uri uri(String endpoint) {
    if (endpoint.startsWith('http')) return Uri.parse(endpoint);
    return Uri.parse('$apiBase/${endpoint.replaceFirst(RegExp(r'^/+'), '')}');
  }

  Map<String, String> headers({bool auth = false}) {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      if (auth && token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<dynamic> get(String endpoint, {bool auth = false}) async {
    final response = await http.get(uri(endpoint), headers: headers(auth: auth));
    return decode(response);
  }

  Future<dynamic> post(String endpoint, Map<String, dynamic> body, {bool auth = false}) async {
    final response = await http.post(
      uri(endpoint),
      headers: headers(auth: auth),
      body: jsonEncode(body),
    );
    return decode(response);
  }

  Future<dynamic> put(String endpoint, Map<String, dynamic> body, {bool auth = false}) async {
    final response = await http.put(
      uri(endpoint),
      headers: headers(auth: auth),
      body: jsonEncode(body),
    );
    return decode(response);
  }

  Future<dynamic> delete(String endpoint, {bool auth = false}) async {
    final response = await http.delete(uri(endpoint), headers: headers(auth: auth));
    return decode(response);
  }

  Future<dynamic> multipart(
    String endpoint, {
    required Map<String, String> fields,
    File? file,
    bool auth = false,
  }) async {
    final request = http.MultipartRequest('POST', uri(endpoint));
    request.headers['Accept'] = 'application/json';
    if (auth && token != null) request.headers['Authorization'] = 'Bearer $token';
    request.fields.addAll(fields);
    if (file != null) {
      request.files.add(await http.MultipartFile.fromPath('payment_proof', file.path));
    }
    final streamed = await request.send();
    final response = await http.Response.fromStream(streamed);
    return decode(response);
  }

  dynamic decode(http.Response response) {
    final body = response.body.isEmpty ? '{}' : response.body;
    dynamic data;
    try {
      data = jsonDecode(body);
    } catch (_) {
      data = {'message': body};
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        data is Map && data['message'] != null
            ? data['message'].toString()
            : 'Request failed (${response.statusCode})',
      );
    }
    return data;
  }
}

class ApiException implements Exception {
  ApiException(this.message);
  final String message;

  @override
  String toString() => message;
}

class Product {
  Product({
    required this.id,
    required this.name,
    required this.slug,
    required this.price,
    required this.description,
    required this.thumbnail,
    required this.category,
  });

  final int id;
  final String name;
  final String slug;
  final double price;
  final String description;
  final String? thumbnail;
  final String category;

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: int.tryParse('${json['id'] ?? json['product_id'] ?? 0}') ?? 0,
      name: '${json['name'] ?? 'Untitled product'}',
      slug: '${json['slug'] ?? json['id'] ?? ''}',
      price: toDouble(json['price']),
      description: stripHtml('${json['description'] ?? ''}'),
      thumbnail: json['thumbnail']?.toString(),
      category: '${json['category_name'] ?? json['category'] ?? 'Digital Product'}',
    );
  }

  String? get imageUrl => mediaUrl(thumbnail);
}

class CartItem {
  CartItem({
    required this.id,
    required this.productId,
    required this.name,
    required this.price,
    required this.quantity,
    required this.total,
    required this.thumbnail,
    required this.purchaseType,
    required this.validityDays,
  });

  final String id;
  final int productId;
  final String name;
  final double price;
  final int quantity;
  final double total;
  final String? thumbnail;
  final String purchaseType;
  final int? validityDays;

  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      id: '${json['id'] ?? json['cart_id'] ?? json['product_id']}',
      productId: int.tryParse('${json['product_id'] ?? json['id'] ?? 0}') ?? 0,
      name: '${json['name'] ?? json['product_name'] ?? 'Product'}',
      price: toDouble(json['price']),
      quantity: int.tryParse('${json['quantity'] ?? 1}') ?? 1,
      total: toDouble(json['total'] ?? json['price']),
      thumbnail: json['thumbnail']?.toString(),
      purchaseType: '${json['purchase_type'] ?? 'personal'}',
      validityDays: int.tryParse('${json['validity_days'] ?? ''}'),
    );
  }

  String? get imageUrl => mediaUrl(thumbnail);
}

class UserProfile {
  UserProfile({required this.name, required this.email, this.phone});

  final String name;
  final String email;
  final String? phone;

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      name: '${json['name'] ?? 'Customer'}',
      email: '${json['email'] ?? ''}',
      phone: json['phone']?.toString(),
    );
  }
}

class CheckoutForm {
  CheckoutForm({
    required this.name,
    required this.email,
    required this.phone,
    required this.paymentMethod,
    required this.notes,
  });

  final String name;
  final String email;
  final String phone;
  final String paymentMethod;
  final String notes;
}

Map<String, dynamic> asMap(dynamic value) {
  if (value is Map<String, dynamic>) return value;
  if (value is Map) return value.map((key, value) => MapEntry('$key', value));
  return {};
}

double toDouble(dynamic value) {
  if (value is num) return value.toDouble();
  return double.tryParse('$value') ?? 0;
}

String stripHtml(String value) {
  return value
      .replaceAll(RegExp(r'<[^>]*>'), ' ')
      .replaceAll(RegExp(r'\s+'), ' ')
      .trim();
}

String? mediaUrl(String? path) {
  if (path == null || path.isEmpty) return null;
  if (path.startsWith('http')) return path;
  final clean = path
      .replaceFirst(RegExp(r'^/+'), '')
      .replaceFirst(RegExp(r'^(public/)?storage/+'), '');
  return '${ApiClient.baseUrl}/public/storage/$clean';
}

String? transactionFrom(dynamic value) {
  final data = asMap(value);
  final nested = asMap(data['data']);
  final purchase = asMap(data['purchase']);
  final nestedPurchase = asMap(nested['purchase']);
  final candidates = [
    data['transaction_id'],
    data['order_transaction_id'],
    data['order_reference'],
    data['reference'],
    purchase['transaction_id'],
    purchase['order_transaction_id'],
    nested['transaction_id'],
    nested['order_transaction_id'],
    nested['order_reference'],
    nestedPurchase['transaction_id'],
    nestedPurchase['order_transaction_id'],
  ];
  for (final candidate in candidates) {
    if (candidate != null && '$candidate'.trim().isNotEmpty) return '$candidate';
  }
  return null;
}

class ShellScreen extends StatefulWidget {
  const ShellScreen({super.key});

  @override
  State<ShellScreen> createState() => _ShellScreenState();
}

class _ShellScreenState extends State<ShellScreen> {
  int index = 0;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final screens = [
      const HomeScreen(),
      const ProductsScreen(),
      const CartScreen(),
      const AccountScreen(),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Next Digi Home', style: TextStyle(fontWeight: FontWeight.w800)),
        actions: [
          if (app.isSignedIn)
            IconButton(
              tooltip: 'Refresh',
              onPressed: () => app.bootstrap(),
              icon: const Icon(Icons.refresh),
            ),
        ],
      ),
      body: app.ready
          ? screens[index]
          : const Center(child: CircularProgressIndicator(color: _accent)),
      bottomNavigationBar: NavigationBar(
        backgroundColor: const Color(0xFF101014),
        indicatorColor: _accent.withValues(alpha: .18),
        selectedIndex: index,
        onDestinationSelected: (value) => setState(() => index = value),
        destinations: [
          const NavigationDestination(icon: Icon(Icons.home_outlined), label: 'Home'),
          const NavigationDestination(icon: Icon(Icons.storefront_outlined), label: 'Products'),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: app.cartCount > 0,
              label: Text('${app.cartCount}'),
              child: const Icon(Icons.shopping_cart_outlined),
            ),
            label: 'Cart',
          ),
          const NavigationDestination(icon: Icon(Icons.person_outline), label: 'Account'),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final featured = app.products.take(6).toList();
    return RefreshIndicator(
      onRefresh: app.bootstrap,
      child: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          const HeroPanel(),
          const SizedBox(height: 22),
          const SectionHeader(title: 'Featured Products', subtitle: 'Popular digital tools and templates'),
          const SizedBox(height: 12),
          for (final product in featured)
            ProductTile(product: product, compact: true),
        ],
      ),
    );
  }
}

class HeroPanel extends StatelessWidget {
  const HeroPanel({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26),
        gradient: const LinearGradient(
          colors: [Color(0xFF112A2E), Color(0xFF241A45)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        border: Border.all(color: _border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
            decoration: BoxDecoration(
              color: _accent.withValues(alpha: .12),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: _accent.withValues(alpha: .35)),
            ),
            child: const Text('Premium Digital Marketplace', style: TextStyle(color: _accent)),
          ),
          const SizedBox(height: 18),
          const Text(
            'Launch faster with ready-to-use digital products.',
            style: TextStyle(fontSize: 30, height: 1.1, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 12),
          const Text(
            'Browse templates, business tools, graphics, and resources built for modern online businesses.',
            style: TextStyle(color: _muted, fontSize: 15, height: 1.5),
          ),
        ],
      ),
    );
  }
}

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final products = app.products.where((product) {
      final q = query.trim().toLowerCase();
      return q.isEmpty ||
          product.name.toLowerCase().contains(q) ||
          product.description.toLowerCase().contains(q) ||
          product.category.toLowerCase().contains(q);
    }).toList();

    return RefreshIndicator(
      onRefresh: app.loadProducts,
      child: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          TextField(
            onChanged: (value) => setState(() => query = value),
            decoration: const InputDecoration(
              hintText: 'Search products',
              prefixIcon: Icon(Icons.search),
            ),
          ),
          const SizedBox(height: 18),
          SectionHeader(title: '${products.length} Products', subtitle: 'Instant digital delivery'),
          const SizedBox(height: 12),
          if (products.isEmpty)
            const EmptyState(icon: Icons.search_off, title: 'No products found')
          else
            for (final product in products) ProductTile(product: product),
        ],
      ),
    );
  }
}

class ProductTile extends StatelessWidget {
  const ProductTile({required this.product, this.compact = false, super.key});

  final Product product;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              ProductImage(url: product.imageUrl, size: compact ? 76 : 94),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(product.category, style: const TextStyle(color: _accent, fontSize: 12)),
                    const SizedBox(height: 4),
                    Text(
                      product.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
                    ),
                    if (!compact) ...[
                      const SizedBox(height: 6),
                      Text(
                        product.description.isEmpty ? 'Premium digital asset' : product.description,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(color: _muted, fontSize: 13),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Text(taka(product.price), style: const TextStyle(color: _accent, fontWeight: FontWeight.w900)),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: _muted),
            ],
          ),
        ),
      ),
    );
  }
}

class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({required this.product, super.key});

  final Product product;

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  bool loading = false;

  Future<void> addToCart() async {
    final app = AppScope.of(context);
    if (!app.isSignedIn) {
      await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const LoginScreen()));
      if (!app.isSignedIn) return;
    }
    setState(() => loading = true);
    try {
      await app.addToCart(widget.product);
      if (!mounted) return;
      showSnack(context, 'Added to cart');
    } catch (error) {
      if (!mounted) return;
      showSnack(context, '$error', error: true);
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    return Scaffold(
      appBar: AppBar(title: const Text('Product Details')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: AspectRatio(
              aspectRatio: 16 / 10,
              child: ProductImage(url: product.imageUrl, size: double.infinity),
            ),
          ),
          const SizedBox(height: 22),
          Text(product.category, style: const TextStyle(color: _accent, fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Text(product.name, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, height: 1.12)),
          const SizedBox(height: 10),
          Text(taka(product.price), style: const TextStyle(color: _accent, fontSize: 24, fontWeight: FontWeight.w900)),
          const SizedBox(height: 18),
          Text(
            product.description.isEmpty ? 'Premium digital product with instant delivery after approval.' : product.description,
            style: const TextStyle(color: _muted, height: 1.55),
          ),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: FilledButton.icon(
            onPressed: loading ? null : addToCart,
            icon: loading
                ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                : const Icon(Icons.add_shopping_cart),
            label: Text(loading ? 'Adding...' : 'Add to Cart'),
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
          ),
        ),
      ),
    );
  }
}

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    if (!app.isSignedIn) return const AuthRequired(message: 'Sign in to view your cart.');
    return RefreshIndicator(
      onRefresh: app.loadCart,
      child: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          const SectionHeader(title: 'Your Cart', subtitle: 'Review items before checkout'),
          const SizedBox(height: 12),
          if (app.cart.isEmpty)
            const EmptyState(icon: Icons.shopping_cart_outlined, title: 'Your cart is empty')
          else ...[
            for (final item in app.cart) CartItemTile(item: item),
            const SizedBox(height: 12),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Total', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                    Text(taka(app.subtotal), style: const TextStyle(color: _accent, fontSize: 20, fontWeight: FontWeight.w900)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),
            FilledButton(
              onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const CheckoutScreen())),
              style: FilledButton.styleFrom(
                backgroundColor: _accent,
                foregroundColor: _background,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('Checkout'),
            ),
          ],
        ],
      ),
    );
  }
}

class CartItemTile extends StatelessWidget {
  const CartItemTile({required this.item, super.key});

  final CartItem item;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            ProductImage(url: item.imageUrl, size: 72),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w800)),
                  const SizedBox(height: 4),
                  Text(taka(item.total), style: const TextStyle(color: _accent, fontWeight: FontWeight.w900)),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () => app.updateCartItem(item, item.quantity - 1),
                        icon: const Icon(Icons.remove_circle_outline),
                      ),
                      Text('${item.quantity}', style: const TextStyle(fontWeight: FontWeight.w800)),
                      IconButton(
                        onPressed: () => app.updateCartItem(item, item.quantity + 1),
                        icon: const Icon(Icons.add_circle_outline),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            IconButton(
              onPressed: () => app.removeCartItem(item),
              icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
            ),
          ],
        ),
      ),
    );
  }
}

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final formKey = GlobalKey<FormState>();
  late final TextEditingController name;
  late final TextEditingController email;
  late final TextEditingController phone;
  final notes = TextEditingController();
  final paymentTransaction = TextEditingController();
  final senderNumber = TextEditingController();
  String paymentMethod = 'bkash';
  String? orderTransactionId;
  File? proof;
  bool submitting = false;

  @override
  void initState() {
    super.initState();
    final user = AppScope.of(context).user;
    name = TextEditingController(text: user?.name ?? '');
    email = TextEditingController(text: user?.email ?? '');
    phone = TextEditingController(text: user?.phone ?? '');
  }

  @override
  void dispose() {
    name.dispose();
    email.dispose();
    phone.dispose();
    notes.dispose();
    paymentTransaction.dispose();
    senderNumber.dispose();
    super.dispose();
  }

  Future<void> placeOrder() async {
    if (!formKey.currentState!.validate()) return;
    setState(() => submitting = true);
    try {
      final app = AppScope.of(context);
      final id = await app.placeOrder(CheckoutForm(
        name: name.text.trim(),
        email: email.text.trim(),
        phone: phone.text.trim(),
        paymentMethod: paymentMethod,
        notes: notes.text.trim(),
      ));
      setState(() => orderTransactionId = id);
    } catch (error) {
      if (mounted) showSnack(context, '$error', error: true);
    } finally {
      if (mounted) setState(() => submitting = false);
    }
  }

  Future<void> pickProof() async {
    final result = await FilePicker.platform.pickFiles(type: FileType.image);
    final path = result?.files.single.path;
    if (path != null) setState(() => proof = File(path));
  }

  Future<void> verify() async {
    if (paymentTransaction.text.trim().isEmpty || senderNumber.text.trim().isEmpty) {
      showSnack(context, 'Enter sender number and transaction ID.', error: true);
      return;
    }
    setState(() => submitting = true);
    try {
      final app = AppScope.of(context);
      final total = app.subtotal;
      await app.verifyPayment(
        orderTransactionId: orderTransactionId!,
        paymentTransactionId: paymentTransaction.text.trim(),
        senderNumber: senderNumber.text.trim(),
        paymentMethod: paymentMethod,
        notes: notes.text.trim(),
        proof: proof,
      );
      if (!mounted) return;
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => SuccessScreen(transactionId: paymentTransaction.text.trim(), total: total),
        ),
      );
    } catch (error) {
      if (mounted) showSnack(context, '$error', error: true);
    } finally {
      if (mounted) setState(() => submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final placed = orderTransactionId != null;
    return Scaffold(
      appBar: AppBar(title: Text(placed ? 'Payment Verification' : 'Checkout')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Order Total', style: TextStyle(color: _muted)),
                  const SizedBox(height: 6),
                  Text(taka(app.subtotal), style: const TextStyle(color: _accent, fontSize: 28, fontWeight: FontWeight.w900)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 14),
          if (!placed) _buildDetailsForm() else _buildPaymentForm(),
        ],
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: FilledButton(
            onPressed: submitting ? null : (placed ? verify : placeOrder),
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            child: Text(submitting ? 'Submitting...' : placed ? 'Submit Payment Proof' : 'Place Order'),
          ),
        ),
      ),
    );
  }

  Widget _buildDetailsForm() {
    return Form(
      key: formKey,
      child: Column(
        children: [
          AppTextField(controller: name, label: 'Full name', validator: requiredText),
          AppTextField(controller: email, label: 'Email', validator: requiredText, keyboardType: TextInputType.emailAddress),
          AppTextField(controller: phone, label: 'Phone', validator: requiredText, keyboardType: TextInputType.phone),
          DropdownButtonFormField<String>(
            initialValue: paymentMethod,
            decoration: const InputDecoration(labelText: 'Payment method'),
            items: const [
              DropdownMenuItem(value: 'bkash', child: Text('bKash')),
              DropdownMenuItem(value: 'rocket', child: Text('Rocket')),
              DropdownMenuItem(value: 'nagad', child: Text('Nagad')),
              DropdownMenuItem(value: 'bank', child: Text('Bank Transfer')),
            ],
            onChanged: (value) => setState(() => paymentMethod = value ?? 'bkash'),
          ),
          const SizedBox(height: 14),
          AppTextField(controller: notes, label: 'Order notes', maxLines: 3),
        ],
      ),
    );
  }

  Widget _buildPaymentForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Payment Reference', style: TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Text(orderTransactionId!, style: const TextStyle(color: _accent, fontFamily: 'monospace')),
                const SizedBox(height: 12),
                const Text('Send payment, then submit the transaction details below.', style: TextStyle(color: _muted)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 14),
        AppTextField(controller: senderNumber, label: 'Sender number', keyboardType: TextInputType.phone),
        AppTextField(controller: paymentTransaction, label: 'Payment transaction ID'),
        OutlinedButton.icon(
          onPressed: pickProof,
          icon: const Icon(Icons.upload_file),
          label: Text(proof == null ? 'Upload payment proof' : 'Selected: ${proof!.path.split(Platform.pathSeparator).last}'),
        ),
      ],
    );
  }
}

class SuccessScreen extends StatelessWidget {
  const SuccessScreen({required this.transactionId, required this.total, super.key});

  final String transactionId;
  final double total;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(22),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(colors: [_accent, _secondary]),
                ),
                child: const Icon(Icons.check, size: 58, color: _background),
              ),
              const SizedBox(height: 24),
              const Text('Order Placed Successfully!', textAlign: TextAlign.center, style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900)),
              const SizedBox(height: 12),
              const Text(
                'Your payment proof has been submitted and is awaiting admin verification.',
                textAlign: TextAlign.center,
                style: TextStyle(color: _muted, height: 1.5),
              ),
              const SizedBox(height: 22),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Column(
                    children: [
                      DetailRow(label: 'Transaction ID', value: transactionId),
                      const SizedBox(height: 10),
                      const DetailRow(label: 'Status', value: 'Pending Verification', valueColor: Colors.amber),
                      const SizedBox(height: 10),
                      DetailRow(label: 'Total', value: taka(total)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 22),
              FilledButton(
                onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                style: FilledButton.styleFrom(backgroundColor: _accent, foregroundColor: _background),
                child: const Text('Back to Home'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    if (!app.isSignedIn) {
      return ListView(
        padding: const EdgeInsets.all(18),
        children: [
          const HeroPanel(),
          const SizedBox(height: 20),
          FilledButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const LoginScreen())),
            style: FilledButton.styleFrom(backgroundColor: _accent, foregroundColor: _background),
            child: const Text('Sign In'),
          ),
          OutlinedButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const RegisterScreen())),
            child: const Text('Create Account'),
          ),
        ],
      );
    }
    return ListView(
      padding: const EdgeInsets.all(18),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(
                  backgroundColor: _accent,
                  foregroundColor: _background,
                  child: Icon(Icons.person),
                ),
                const SizedBox(height: 14),
                Text(app.user?.name ?? 'Customer', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900)),
                Text(app.user?.email ?? '', style: const TextStyle(color: _muted)),
              ],
            ),
          ),
        ),
        const SizedBox(height: 14),
        OutlinedButton.icon(
          onPressed: app.logout,
          icon: const Icon(Icons.logout),
          label: const Text('Logout'),
        ),
      ],
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final email = TextEditingController();
  final password = TextEditingController();
  bool loading = false;

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  Future<void> submit() async {
    setState(() => loading = true);
    try {
      await AppScope.of(context).login(email.text.trim(), password.text);
      if (mounted) Navigator.of(context).pop();
    } catch (error) {
      if (mounted) showSnack(context, '$error', error: true);
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sign In')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          const SectionHeader(title: 'Welcome back', subtitle: 'Sign in to manage cart and orders'),
          const SizedBox(height: 18),
          AppTextField(controller: email, label: 'Email', keyboardType: TextInputType.emailAddress),
          AppTextField(controller: password, label: 'Password', obscureText: true),
          FilledButton(
            onPressed: loading ? null : submit,
            style: FilledButton.styleFrom(backgroundColor: _accent, foregroundColor: _background),
            child: Text(loading ? 'Signing in...' : 'Sign In'),
          ),
        ],
      ),
    );
  }
}

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final name = TextEditingController();
  final email = TextEditingController();
  final phone = TextEditingController();
  final password = TextEditingController();
  bool loading = false;

  @override
  void dispose() {
    name.dispose();
    email.dispose();
    phone.dispose();
    password.dispose();
    super.dispose();
  }

  Future<void> submit() async {
    setState(() => loading = true);
    try {
      await AppScope.of(context).register(
        name: name.text.trim(),
        email: email.text.trim(),
        phone: phone.text.trim(),
        password: password.text,
      );
      if (!mounted) return;
      showSnack(context, 'Registration successful. Please sign in.');
      Navigator.of(context).pop();
    } catch (error) {
      if (mounted) showSnack(context, '$error', error: true);
    } finally {
      if (mounted) setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Create Account')),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          AppTextField(controller: name, label: 'Full name'),
          AppTextField(controller: email, label: 'Email', keyboardType: TextInputType.emailAddress),
          AppTextField(controller: phone, label: 'Phone', keyboardType: TextInputType.phone),
          AppTextField(controller: password, label: 'Password', obscureText: true),
          FilledButton(
            onPressed: loading ? null : submit,
            style: FilledButton.styleFrom(backgroundColor: _accent, foregroundColor: _background),
            child: Text(loading ? 'Creating...' : 'Create Account'),
          ),
        ],
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({required this.title, required this.subtitle, super.key});

  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
        const SizedBox(height: 4),
        Text(subtitle, style: const TextStyle(color: _muted)),
      ],
    );
  }
}

class ProductImage extends StatelessWidget {
  const ProductImage({required this.url, required this.size, super.key});

  final String? url;
  final double size;

  @override
  Widget build(BuildContext context) {
    final placeholder = Container(
      width: size,
      height: size,
      color: const Color(0xFF111116),
      child: const Icon(Icons.image_outlined, color: _muted),
    );
    if (url == null) return ClipRRect(borderRadius: BorderRadius.circular(14), child: placeholder);
    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: Image.network(
        url!,
        width: size,
        height: size,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) => placeholder,
      ),
    );
  }
}

class AppTextField extends StatelessWidget {
  const AppTextField({
    required this.controller,
    required this.label,
    this.validator,
    this.keyboardType,
    this.obscureText = false,
    this.maxLines = 1,
    super.key,
  });

  final TextEditingController controller;
  final String label;
  final FormFieldValidator<String>? validator;
  final TextInputType? keyboardType;
  final bool obscureText;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: TextFormField(
        controller: controller,
        validator: validator,
        keyboardType: keyboardType,
        obscureText: obscureText,
        maxLines: obscureText ? 1 : maxLines,
        decoration: InputDecoration(labelText: label),
      ),
    );
  }
}

class DetailRow extends StatelessWidget {
  const DetailRow({required this.label, required this.value, this.valueColor, super.key});

  final String label;
  final String value;
  final Color? valueColor;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: _muted)),
        Flexible(
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: TextStyle(color: valueColor ?? Colors.white, fontWeight: FontWeight.w800),
          ),
        ),
      ],
    );
  }
}

class EmptyState extends StatelessWidget {
  const EmptyState({required this.icon, required this.title, super.key});

  final IconData icon;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 56),
      child: Column(
        children: [
          Icon(icon, color: _muted, size: 58),
          const SizedBox(height: 12),
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
        ],
      ),
    );
  }
}

class AuthRequired extends StatelessWidget {
  const AuthRequired({required this.message, super.key});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(22),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.lock_outline, color: _muted, size: 54),
            const SizedBox(height: 12),
            Text(message, textAlign: TextAlign.center, style: const TextStyle(color: _muted)),
            const SizedBox(height: 18),
            FilledButton(
              onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const LoginScreen())),
              style: FilledButton.styleFrom(backgroundColor: _accent, foregroundColor: _background),
              child: const Text('Sign In'),
            ),
          ],
        ),
      ),
    );
  }
}

String? requiredText(String? value) {
  return value == null || value.trim().isEmpty ? 'Required' : null;
}

void showSnack(BuildContext context, String message, {bool error = false}) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message),
      backgroundColor: error ? Colors.redAccent : _accent,
      behavior: SnackBarBehavior.floating,
    ),
  );
}
