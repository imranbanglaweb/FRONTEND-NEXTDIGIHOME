import 'dart:convert';
import 'dart:async';
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
            toolbarHeight: 76,
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
  SiteSettings settings = SiteSettings.defaults();

  bool get isSignedIn => api.token != null && api.token!.isNotEmpty;
  int get cartCount => cart.fold(0, (sum, item) => sum + item.quantity);
  double get subtotal => cart.fold(0, (sum, item) => sum + item.total);

  Future<void> bootstrap() async {
    await api.loadToken();
    await Future.wait([
      loadSettings(),
      loadProducts(),
      if (isSignedIn) loadUserAndCart(),
    ]);
    ready = true;
    notifyListeners();
  }

  Future<void> loadSettings() async {
    try {
      final response = await api.get('settings');
      settings = SiteSettings.fromJson(unwrapData(response));
    } catch (_) {
      settings = SiteSettings.defaults();
    }
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
        .map(
          (item) => {
            'product_id': item.productId,
            'quantity': item.quantity,
            'purchase_type': item.purchaseType,
            'validity_days': item.validityDays,
          },
        )
        .toList();
    final response = await api.post('/checkout', {
      'customer_name': form.name,
      'customer_email': form.email,
      'customer_phone': form.phone,
      'payment_method': form.paymentMethod,
      'notes': form.notes,
      'items': jsonEncode(orderItems),
    }, auth: true);
    return transactionFrom(response) ??
        'ORDER-${DateTime.now().millisecondsSinceEpoch}';
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
    await api.multipart(
      '/checkout/verify',
      fields: fields,
      file: proof,
      auth: true,
    );
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
    final response = await http.get(
      uri(endpoint),
      headers: headers(auth: auth),
    );
    return decode(response);
  }

  Future<dynamic> post(
    String endpoint,
    Map<String, dynamic> body, {
    bool auth = false,
  }) async {
    final response = await http.post(
      uri(endpoint),
      headers: headers(auth: auth),
      body: jsonEncode(body),
    );
    return decode(response);
  }

  Future<dynamic> put(
    String endpoint,
    Map<String, dynamic> body, {
    bool auth = false,
  }) async {
    final response = await http.put(
      uri(endpoint),
      headers: headers(auth: auth),
      body: jsonEncode(body),
    );
    return decode(response);
  }

  Future<dynamic> delete(String endpoint, {bool auth = false}) async {
    final response = await http.delete(
      uri(endpoint),
      headers: headers(auth: auth),
    );
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
    if (auth && token != null) {
      request.headers['Authorization'] = 'Bearer $token';
    }
    request.fields.addAll(fields);
    if (file != null) {
      request.files.add(
        await http.MultipartFile.fromPath('payment_proof', file.path),
      );
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
      category:
          '${json['category_name'] ?? json['category'] ?? 'Digital Product'}',
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

class SiteSettings {
  const SiteSettings({
    required this.title,
    required this.description,
    this.logo,
  });

  final String title;
  final String description;
  final String? logo;

  factory SiteSettings.defaults() {
    return const SiteSettings(
      title: 'Next Digi Home',
      description: 'Premium digital products for modern businesses.',
    );
  }

  factory SiteSettings.fromJson(Map<String, dynamic> json) {
    final fallback = SiteSettings.defaults();
    final logo = firstNonEmpty([
      json['site_logo'],
      json['admin_logo'],
      json['logo'],
      json['favicon'],
    ]);
    return SiteSettings(
      title:
          firstNonEmpty([
            json['site_title'],
            json['admin_title'],
            json['title'],
          ]) ??
          fallback.title,
      description:
          firstNonEmpty([
            json['site_description'],
            json['admin_description'],
            json['description'],
          ]) ??
          fallback.description,
      logo: logoUrl(logo),
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

Map<String, dynamic> unwrapData(dynamic value) {
  final root = asMap(value);
  final data = asMap(root['data']);
  final nestedData = asMap(data['data']);
  if (nestedData.isNotEmpty) return nestedData;
  if (data.isNotEmpty) return data;
  return root;
}

String? firstNonEmpty(List<dynamic> values) {
  for (final value in values) {
    final text = value?.toString().trim();
    if (text != null && text.isNotEmpty && text != 'null') return text;
  }
  return null;
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

String? logoUrl(String? path) {
  if (path == null || path.isEmpty) return null;
  if (path.startsWith('http')) return path;
  final clean = path.replaceFirst(RegExp(r'^/+'), '');
  if (clean.startsWith('public/')) {
    return '${ApiClient.baseUrl}/$clean';
  }
  if (clean.contains('/')) {
    return '${ApiClient.baseUrl}/public/$clean';
  }
  return '${ApiClient.baseUrl}/public/admin_resource/assets/images/${Uri.encodeComponent(clean)}';
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
    if (candidate != null && '$candidate'.trim().isNotEmpty) {
      return '$candidate';
    }
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
      const MoreScreen(),
      const AccountScreen(),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const BrandTitle(),
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
          const NavigationDestination(
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          const NavigationDestination(
            icon: Icon(Icons.storefront_outlined),
            label: 'Products',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: app.cartCount > 0,
              label: Text('${app.cartCount}'),
              child: const Icon(Icons.shopping_cart_outlined),
            ),
            label: 'Cart',
          ),
          const NavigationDestination(
            icon: Icon(Icons.grid_view_outlined),
            label: 'More',
          ),
          const NavigationDestination(
            icon: Icon(Icons.person_outline),
            label: 'Account',
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final PageController sliderController;
  Timer? sliderTimer;
  int currentSlide = 0;

  @override
  void initState() {
    super.initState();
    sliderController = PageController(viewportFraction: .92);
    sliderTimer = Timer.periodic(const Duration(seconds: 5), (_) {
      if (!mounted || !sliderController.hasClients) return;
      final app = AppScope.of(context);
      final count = app.products.isEmpty ? 3 : app.products.take(8).length;
      final next = (currentSlide + 1) % count;
      sliderController.animateToPage(
        next,
        duration: const Duration(milliseconds: 420),
        curve: Curves.easeOutCubic,
      );
    });
  }

  @override
  void dispose() {
    sliderTimer?.cancel();
    sliderController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final featured = app.products.take(8).toList();
    final categories = app.products
        .map((product) => product.category)
        .where((category) => category.trim().isNotEmpty)
        .toSet()
        .take(8)
        .toList();
    return RefreshIndicator(
      onRefresh: app.bootstrap,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 22),
        children: [
          WebsiteHeroSlider(
            products: featured,
            controller: sliderController,
            currentSlide: currentSlide,
            onChanged: (value) => setState(() => currentSlide = value),
          ),
          const SizedBox(height: 18),
          const HomeStatsStrip(),
          const SizedBox(height: 24),
          const SectionHeader(
            title: 'Built for Modern Businesses',
            subtitle: 'Everything you need to succeed, delivered instantly.',
          ),
          const SizedBox(height: 12),
          const FeatureGrid(),
          const SizedBox(height: 24),
          const VideoPreviewCard(),
          const SizedBox(height: 24),
          if (categories.isNotEmpty) ...[
            const SectionHeader(
              title: 'Browse Categories',
              subtitle: 'Quick access to popular product types',
            ),
            const SizedBox(height: 12),
            CategoryChips(categories: categories),
            const SizedBox(height: 24),
          ],
          const SectionHeader(
            title: 'Featured Products',
            subtitle: 'Popular digital tools and templates',
          ),
          const SizedBox(height: 12),
          if (featured.isEmpty)
            const EmptyState(
              icon: Icons.inventory_2_outlined,
              title: 'Products will appear here',
            )
          else
            for (final product in featured)
              ProductTile(product: product, compact: true),
          const SizedBox(height: 18),
          const ReviewCards(),
          const SizedBox(height: 18),
          const UseCaseCards(),
          const SizedBox(height: 24),
          const AppFooter(),
        ],
      ),
    );
  }
}

class WebsiteHeroSlider extends StatelessWidget {
  const WebsiteHeroSlider({
    required this.products,
    required this.controller,
    required this.currentSlide,
    required this.onChanged,
    super.key,
  });

  final List<Product> products;
  final PageController controller;
  final int currentSlide;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    final slides = products.isEmpty
        ? [
            FallbackSlideData(
              'Transform Your Business',
              'Premium Digital Solutions',
              'Discover templates, tools, and resources built to accelerate growth.',
              Icons.rocket_launch_outlined,
            ),
            FallbackSlideData(
              'Professional Templates',
              'Ready-to-Use Designs',
              'Launch landing pages, pitch decks, and business assets faster.',
              Icons.dashboard_customize_outlined,
            ),
            FallbackSlideData(
              'Productivity Tools',
              'Boost Your Workflow',
              'Streamline operations with practical digital products.',
              Icons.bolt_outlined,
            ),
          ]
        : products.take(8).toList();
    return Column(
      children: [
        SizedBox(
          height: 438,
          child: PageView.builder(
            controller: controller,
            itemCount: slides.length,
            onPageChanged: onChanged,
            itemBuilder: (context, index) {
              final slide = slides[index];
              if (slide is Product) return ProductHeroSlide(product: slide);
              return FallbackHeroSlide(slide: slide as FallbackSlideData);
            },
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(slides.length, (index) {
            final active = index == currentSlide;
            return AnimatedContainer(
              duration: const Duration(milliseconds: 220),
              width: active ? 24 : 8,
              height: 8,
              margin: const EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(999),
                gradient: active
                    ? const LinearGradient(colors: [_accent, _secondary])
                    : null,
                color: active ? null : Colors.white24,
              ),
            );
          }),
        ),
      ],
    );
  }
}

class ProductHeroSlide extends StatelessWidget {
  const ProductHeroSlide({required this.product, super.key});

  final Product product;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 8),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white.withValues(alpha: .08)),
        gradient: const LinearGradient(
          colors: [Color(0xFF101014), Color(0xFF182024), Color(0xFF20183B)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: _accent.withValues(alpha: .12),
            blurRadius: 28,
            offset: const Offset(0, 18),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Stack(
              children: [
                Positioned.fill(
                  child: ClipRRect(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(30),
                    ),
                    child: ProductImage(
                      url: product.imageUrl,
                      size: double.infinity,
                    ),
                  ),
                ),
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(30),
                      ),
                      gradient: LinearGradient(
                        colors: [
                          Colors.black.withValues(alpha: .78),
                          Colors.transparent,
                          Colors.black.withValues(alpha: .86),
                        ],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  left: 18,
                  top: 18,
                  child: Pill(label: product.category.toUpperCase()),
                ),
                Positioned(
                  right: 18,
                  bottom: 18,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 14,
                      vertical: 9,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: .65),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: _accent.withValues(alpha: .25)),
                    ),
                    child: Text(
                      taka(product.price),
                      style: const TextStyle(
                        color: _accent,
                        fontWeight: FontWeight.w900,
                        fontSize: 18,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 18, 18, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Premium Digital Product',
                  style: TextStyle(color: _accent, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 8),
                Text(
                  product.name,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 25,
                    height: 1.08,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  product.description.isEmpty
                      ? 'Ready-to-use resource for modern business workflows.'
                      : product.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(color: _muted, height: 1.45),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Expanded(
                      child: FilledButton(
                        onPressed: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) =>
                                ProductDetailScreen(product: product),
                          ),
                        ),
                        style: FilledButton.styleFrom(
                          backgroundColor: _accent,
                          foregroundColor: _background,
                        ),
                        child: const Text('View Product'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class FallbackSlideData {
  FallbackSlideData(this.title, this.subtitle, this.description, this.icon);

  final String title;
  final String subtitle;
  final String description;
  final IconData icon;
}

class FallbackHeroSlide extends StatelessWidget {
  const FallbackHeroSlide({required this.slide, super.key});

  final FallbackSlideData slide;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 8),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white.withValues(alpha: .08)),
        gradient: const LinearGradient(
          colors: [Color(0xFF112A2E), Color(0xFF241A45)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Pill(label: slide.subtitle.toUpperCase()),
          const Spacer(),
          Icon(slide.icon, size: 92, color: _accent),
          const SizedBox(height: 24),
          Text(
            slide.title,
            style: const TextStyle(
              fontSize: 32,
              height: 1.05,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            slide.description,
            style: const TextStyle(color: _muted, height: 1.5),
          ),
          const Spacer(),
          FilledButton(
            onPressed: () {},
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
            ),
            child: const Text('Explore Marketplace'),
          ),
        ],
      ),
    );
  }
}

class HomeStatsStrip extends StatelessWidget {
  const HomeStatsStrip({super.key});

  @override
  Widget build(BuildContext context) {
    const stats = [
      ('2.5K+', 'Products'),
      ('15K+', 'Customers'),
      ('45K+', 'Sales'),
      ('4.8★', 'Rating'),
    ];
    return Row(
      children: [
        for (final stat in stats)
          Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
              decoration: BoxDecoration(
                color: _card,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: _border),
              ),
              child: Column(
                children: [
                  Text(
                    stat.$1,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: _accent,
                      fontSize: 19,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    stat.$2,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: _muted, fontSize: 11),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class FeatureGrid extends StatelessWidget {
  const FeatureGrid({super.key});

  @override
  Widget build(BuildContext context) {
    const features = [
      (
        Icons.flash_on_outlined,
        'Instant Delivery',
        'Download products quickly after payment approval.',
      ),
      (
        Icons.verified_outlined,
        'Professional Quality',
        'Curated assets tested for business use.',
      ),
      (
        Icons.support_agent_outlined,
        'Lifetime Support',
        'Helpful support for your digital purchases.',
      ),
    ];
    return Column(
      children: [
        for (final feature in features)
          Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: _card,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: _border),
            ),
            child: Row(
              children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    gradient: const LinearGradient(
                      colors: [_accent, _secondary],
                    ),
                  ),
                  child: Icon(feature.$1, color: _background),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        feature.$2,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        feature.$3,
                        style: const TextStyle(color: _muted, height: 1.35),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class VideoPreviewCard extends StatelessWidget {
  const VideoPreviewCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(
          title: 'Video Preview',
          subtitle: 'Watch Next Digi Home in action',
        ),
        const SizedBox(height: 12),
        Container(
          decoration: BoxDecoration(
            color: _card,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: _accent.withValues(alpha: .22)),
            boxShadow: [
              BoxShadow(
                color: _secondary.withValues(alpha: .14),
                blurRadius: 28,
                offset: const Offset(0, 16),
              ),
            ],
          ),
          clipBehavior: Clip.antiAlias,
          child: Stack(
            alignment: Alignment.center,
            children: [
              AspectRatio(
                aspectRatio: 16 / 9,
                child: Image.network(
                  'https://img.youtube.com/vi/b5otVQURO6I/hqdefault.jpg',
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) => Container(
                    color: const Color(0xFF111116),
                    child: const Icon(
                      Icons.play_circle_outline,
                      size: 72,
                      color: _accent,
                    ),
                  ),
                ),
              ),
              Container(
                width: 76,
                height: 76,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.black.withValues(alpha: .7),
                  border: Border.all(color: _accent),
                ),
                child: const Icon(
                  Icons.play_arrow_rounded,
                  size: 48,
                  color: _accent,
                ),
              ),
              const Positioned(
                left: 16,
                right: 16,
                bottom: 16,
                child: Text(
                  'Open the website video preview: youtube.com/watch?v=b5otVQURO6I',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class CategoryChips extends StatelessWidget {
  const CategoryChips({required this.categories, super.key});

  final List<String> categories;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        for (final category in categories)
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: _accent.withValues(alpha: .08),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: _accent.withValues(alpha: .22)),
            ),
            child: Text(
              category,
              style: const TextStyle(
                color: _accent,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
      ],
    );
  }
}

class ReviewCards extends StatelessWidget {
  const ReviewCards({super.key});

  @override
  Widget build(BuildContext context) {
    const reviews = [
      (
        'Tanvir Ahmed',
        'Online Shop Owner',
        'The landing page template was clean and easy to adjust for my store.',
      ),
      (
        'Nusrat Jahan',
        'Freelance Designer',
        'The social graphics pack saved routine design time for client pages.',
      ),
      (
        'Mahmudul Hasan',
        'Training Center Manager',
        'Presentation and certificate templates looked professional and were simple to edit.',
      ),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(
          title: 'Customer Reviews',
          subtitle: 'Practical feedback from real users',
        ),
        const SizedBox(height: 12),
        for (final review in reviews)
          Card(
            margin: const EdgeInsets.only(bottom: 12),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          review.$1,
                          style: const TextStyle(fontWeight: FontWeight.w900),
                        ),
                      ),
                      const Text(
                        '★★★★★',
                        style: TextStyle(color: Colors.amber),
                      ),
                    ],
                  ),
                  Text(
                    review.$2,
                    style: const TextStyle(color: _muted, fontSize: 12),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    review.$3,
                    style: const TextStyle(color: _muted, height: 1.45),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

class UseCaseCards extends StatelessWidget {
  const UseCaseCards({super.key});

  @override
  Widget build(BuildContext context) {
    const cases = [
      (
        Icons.rocket_launch_outlined,
        'Startup Launch',
        'Website templates, branding kits, and pitch assets.',
      ),
      (
        Icons.business_center_outlined,
        'Enterprise',
        'Business process and reporting templates.',
      ),
      (
        Icons.palette_outlined,
        'Creative Agencies',
        'Design assets, UI kits, and client-ready resources.',
      ),
      (
        Icons.school_outlined,
        'Education',
        'Course templates, slides, certificates, and learning materials.',
      ),
    ];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(
          title: 'Professional Use Cases',
          subtitle: 'Built for everyday business work',
        ),
        const SizedBox(height: 12),
        GridView.builder(
          itemCount: cases.length,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: .95,
          ),
          itemBuilder: (context, index) {
            final item = cases[index];
            return Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: _card,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: _border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(item.$1, color: _accent, size: 32),
                  const SizedBox(height: 12),
                  Text(
                    item.$2,
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 6),
                  Expanded(
                    child: Text(
                      item.$3,
                      style: const TextStyle(
                        color: _muted,
                        fontSize: 12,
                        height: 1.35,
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }
}

class Pill extends StatelessWidget {
  const Pill({required this.label, super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
      decoration: BoxDecoration(
        color: _accent.withValues(alpha: .12),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: _accent.withValues(alpha: .35)),
      ),
      child: Text(
        label,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: const TextStyle(
          color: _accent,
          fontSize: 11,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
  }
}

class BrandLogo extends StatelessWidget {
  const BrandLogo({this.size = 64, this.width, this.height, super.key});

  final double size;
  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    final logo = AppScope.of(context).settings.logo;
    final logoWidth = width ?? size;
    final logoHeight = height ?? size;
    final radius = (logoWidth < logoHeight ? logoWidth : logoHeight) * .24;
    return Container(
      width: logoWidth,
      height: logoHeight,
      padding: EdgeInsets.all(
        (logoWidth < logoHeight ? logoWidth : logoHeight) * .08,
      ),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(radius),
        border: Border.all(color: _accent.withValues(alpha: .22)),
        boxShadow: [
          BoxShadow(
            color: _accent.withValues(alpha: .16),
            blurRadius: logoHeight * .45,
            offset: Offset(0, logoHeight * .14),
          ),
        ],
      ),
      child: logo == null
          ? const FallbackLogoImage()
          : Image.network(
              logo,
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) =>
                  const FallbackLogoImage(),
            ),
    );
  }
}

class FallbackLogoImage extends StatelessWidget {
  const FallbackLogoImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/logo.png',
      fit: BoxFit.contain,
      errorBuilder: (context, error, stackTrace) =>
          const Icon(Icons.bolt, color: _accent),
    );
  }
}

class BrandTitle extends StatelessWidget {
  const BrandTitle({super.key});

  @override
  Widget build(BuildContext context) {
    final title = AppScope.of(context).settings.title;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const BrandLogo(size: 58),
        const SizedBox(width: 12),
        Flexible(
          child: Text(
            title,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(fontWeight: FontWeight.w900),
          ),
        ),
      ],
    );
  }
}

class AppFooter extends StatelessWidget {
  const AppFooter({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = AppScope.of(context).settings;
    final year = DateTime.now().year;
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF121214),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: _border),
      ),
      child: Column(
        children: [
          const BrandLogo(size: 88),
          const SizedBox(height: 12),
          Text(
            settings.title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 6),
          Text(
            settings.description,
            textAlign: TextAlign.center,
            style: const TextStyle(color: _muted, height: 1.4),
          ),
          const SizedBox(height: 14),
          Text(
            '\u00A9 $year ${settings.title}. All rights reserved.',
            textAlign: TextAlign.center,
            style: const TextStyle(color: _muted, fontSize: 12),
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
          SectionHeader(
            title: '${products.length} Products',
            subtitle: 'Instant digital delivery',
          ),
          const SizedBox(height: 12),
          if (products.isEmpty)
            const EmptyState(icon: Icons.search_off, title: 'No products found')
          else
            for (final product in products) ProductTile(product: product),
          const SizedBox(height: 18),
          const AppFooter(),
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
          MaterialPageRoute(
            builder: (_) => ProductDetailScreen(product: product),
          ),
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
                    Text(
                      product.category,
                      style: const TextStyle(color: _accent, fontSize: 12),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      product.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if (!compact) ...[
                      const SizedBox(height: 6),
                      Text(
                        product.description.isEmpty
                            ? 'Premium digital asset'
                            : product.description,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(color: _muted, fontSize: 13),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Text(
                      taka(product.price),
                      style: const TextStyle(
                        color: _accent,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
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
      await Navigator.of(
        context,
      ).push(MaterialPageRoute(builder: (_) => const LoginScreen()));
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
          Text(
            product.category,
            style: const TextStyle(color: _accent, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 8),
          Text(
            product.name,
            style: const TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              height: 1.12,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            taka(product.price),
            style: const TextStyle(
              color: _accent,
              fontSize: 24,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 18),
          Text(
            product.description.isEmpty
                ? 'Premium digital product with instant delivery after approval.'
                : product.description,
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
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
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
    if (!app.isSignedIn) {
      return const AuthRequired(message: 'Sign in to view your cart.');
    }
    return RefreshIndicator(
      onRefresh: app.loadCart,
      child: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          const SectionHeader(
            title: 'Your Cart',
            subtitle: 'Review items before checkout',
          ),
          const SizedBox(height: 12),
          if (app.cart.isEmpty)
            const EmptyState(
              icon: Icons.shopping_cart_outlined,
              title: 'Your cart is empty',
            )
          else ...[
            for (final item in app.cart) CartItemTile(item: item),
            const SizedBox(height: 12),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Total',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Text(
                      taka(app.subtotal),
                      style: const TextStyle(
                        color: _accent,
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),
            FilledButton(
              onPressed: () => Navigator.of(
                context,
              ).push(MaterialPageRoute(builder: (_) => const CheckoutScreen())),
              style: FilledButton.styleFrom(
                backgroundColor: _accent,
                foregroundColor: _background,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('Checkout'),
            ),
          ],
          const SizedBox(height: 18),
          const AppFooter(),
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
                  Text(
                    item.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    taka(item.total),
                    style: const TextStyle(
                      color: _accent,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  Row(
                    children: [
                      IconButton(
                        onPressed: () =>
                            app.updateCartItem(item, item.quantity - 1),
                        icon: const Icon(Icons.remove_circle_outline),
                      ),
                      Text(
                        '${item.quantity}',
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      IconButton(
                        onPressed: () =>
                            app.updateCartItem(item, item.quantity + 1),
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
      final id = await app.placeOrder(
        CheckoutForm(
          name: name.text.trim(),
          email: email.text.trim(),
          phone: phone.text.trim(),
          paymentMethod: paymentMethod,
          notes: notes.text.trim(),
        ),
      );
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
    if (paymentTransaction.text.trim().isEmpty ||
        senderNumber.text.trim().isEmpty) {
      showSnack(
        context,
        'Enter sender number and transaction ID.',
        error: true,
      );
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
          builder: (_) => SuccessScreen(
            transactionId: paymentTransaction.text.trim(),
            total: total,
          ),
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
                  Text(
                    taka(app.subtotal),
                    style: const TextStyle(
                      color: _accent,
                      fontSize: 28,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
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
            child: Text(
              submitting
                  ? 'Submitting...'
                  : placed
                  ? 'Submit Payment Proof'
                  : 'Place Order',
            ),
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
          AppTextField(
            controller: name,
            label: 'Full name',
            validator: requiredText,
          ),
          AppTextField(
            controller: email,
            label: 'Email',
            validator: requiredText,
            keyboardType: TextInputType.emailAddress,
          ),
          AppTextField(
            controller: phone,
            label: 'Phone',
            validator: requiredText,
            keyboardType: TextInputType.phone,
          ),
          DropdownButtonFormField<String>(
            initialValue: paymentMethod,
            decoration: const InputDecoration(labelText: 'Payment method'),
            items: const [
              DropdownMenuItem(value: 'bkash', child: Text('bKash')),
              DropdownMenuItem(value: 'rocket', child: Text('Rocket')),
              DropdownMenuItem(value: 'nagad', child: Text('Nagad')),
              DropdownMenuItem(value: 'bank', child: Text('Bank Transfer')),
            ],
            onChanged: (value) =>
                setState(() => paymentMethod = value ?? 'bkash'),
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
                const Text(
                  'Payment Reference',
                  style: TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 8),
                Text(
                  orderTransactionId!,
                  style: const TextStyle(
                    color: _accent,
                    fontFamily: 'monospace',
                  ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Send payment, then submit the transaction details below.',
                  style: TextStyle(color: _muted),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 14),
        AppTextField(
          controller: senderNumber,
          label: 'Sender number',
          keyboardType: TextInputType.phone,
        ),
        AppTextField(
          controller: paymentTransaction,
          label: 'Payment transaction ID',
        ),
        OutlinedButton.icon(
          onPressed: pickProof,
          icon: const Icon(Icons.upload_file),
          label: Text(
            proof == null
                ? 'Upload payment proof'
                : 'Selected: ${proof!.path.split(Platform.pathSeparator).last}',
          ),
        ),
      ],
    );
  }
}

class SuccessScreen extends StatelessWidget {
  const SuccessScreen({
    required this.transactionId,
    required this.total,
    super.key,
  });

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
              const Text(
                'Order Placed Successfully!',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
              ),
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
                      const DetailRow(
                        label: 'Status',
                        value: 'Pending Verification',
                        valueColor: Colors.amber,
                      ),
                      const SizedBox(height: 10),
                      DetailRow(label: 'Total', value: taka(total)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 22),
              FilledButton(
                onPressed: () =>
                    Navigator.of(context).popUntil((route) => route.isFirst),
                style: FilledButton.styleFrom(
                  backgroundColor: _accent,
                  foregroundColor: _background,
                ),
                child: const Text('Back to Home'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class MoreScreen extends StatelessWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(18),
      children: const [
        SectionHeader(
          title: 'More from Next Digi Home',
          subtitle: 'Company pages and support resources',
        ),
        SizedBox(height: 16),
        InfoPageTile(
          icon: Icons.info_outline,
          title: 'About',
          subtitle: 'Premium digital marketplace for creators and businesses.',
          body:
              'Next Digi Home provides ready-to-use digital products, templates, tools, and design resources that help local businesses, agencies, freelancers, and educators launch faster.',
        ),
        InfoPageTile(
          icon: Icons.design_services_outlined,
          title: 'Services',
          subtitle: 'Templates, business tools, graphics, and web resources.',
          body:
              'Browse digital marketing assets, web development templates, UI kits, social media graphics, presentation decks, and workflow tools with instant delivery after order approval.',
        ),
        InfoPageTile(
          icon: Icons.article_outlined,
          title: 'Blog',
          subtitle: 'Business, design, and digital product insights.',
          body:
              'Use the blog area for product guides, launch tips, marketing tutorials, template walkthroughs, and customer education content matching the frontend website.',
        ),
        InfoPageTile(
          icon: Icons.contact_support_outlined,
          title: 'Contact',
          subtitle: 'Get support for purchases and payment verification.',
          body:
              'For support, use your account email, payment transaction ID, and product/order details so the team can verify and respond quickly.',
        ),
        SizedBox(height: 12),
        TrustPanel(),
        SizedBox(height: 18),
        AppFooter(),
      ],
    );
  }
}

class InfoPageTile extends StatelessWidget {
  const InfoPageTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.body,
    super.key,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: Container(
          width: 46,
          height: 46,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            gradient: const LinearGradient(colors: [_accent, _secondary]),
          ),
          child: Icon(icon, color: _background),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w900)),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(subtitle, style: const TextStyle(color: _muted)),
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: () => Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => InfoDetailScreen(
              title: title,
              subtitle: subtitle,
              body: body,
              icon: icon,
            ),
          ),
        ),
      ),
    );
  }
}

class InfoDetailScreen extends StatelessWidget {
  const InfoDetailScreen({
    required this.title,
    required this.subtitle,
    required this.body,
    required this.icon,
    super.key,
  });

  final String title;
  final String subtitle;
  final String body;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: ListView(
        padding: const EdgeInsets.all(18),
        children: [
          Container(
            padding: const EdgeInsets.all(22),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: _border),
              gradient: const LinearGradient(
                colors: [Color(0xFF112A2E), Color(0xFF241A45)],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(icon, color: _accent, size: 46),
                const SizedBox(height: 16),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  subtitle,
                  style: const TextStyle(
                    color: _accent,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          Text(
            body,
            style: const TextStyle(color: _muted, fontSize: 16, height: 1.6),
          ),
        ],
      ),
    );
  }
}

class TrustPanel extends StatelessWidget {
  const TrustPanel({super.key});

  @override
  Widget build(BuildContext context) {
    const badges = [
      (Icons.security_outlined, 'Secure Payment'),
      (Icons.verified_user_outlined, 'Verified Products'),
      (Icons.download_done_outlined, 'Instant Delivery'),
      (Icons.support_agent_outlined, 'Support'),
    ];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: _card,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: _border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Trusted Worldwide',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              for (final badge in badges)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 10,
                  ),
                  decoration: BoxDecoration(
                    color: _background,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: _border),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(badge.$1, color: _accent, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        badge.$2,
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class AuthPromoCard extends StatelessWidget {
  const AuthPromoCard({super.key});

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
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Pill(label: 'CUSTOMER ACCOUNT'),
          SizedBox(height: 18),
          BrandLogo(size: 112),
          SizedBox(height: 18),
          Text(
            'Sign in to manage your digital products.',
            style: TextStyle(
              fontSize: 28,
              height: 1.1,
              fontWeight: FontWeight.w900,
            ),
          ),
          SizedBox(height: 12),
          Text(
            'Access cart, checkout, payment verification, and approved downloads from one account.',
            style: TextStyle(color: _muted, height: 1.5),
          ),
        ],
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
          const AuthPromoCard(),
          const SizedBox(height: 20),
          FilledButton(
            onPressed: () => Navigator.of(
              context,
            ).push(MaterialPageRoute(builder: (_) => const LoginScreen())),
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
            ),
            child: const Text('Sign In'),
          ),
          OutlinedButton(
            onPressed: () => Navigator.of(
              context,
            ).push(MaterialPageRoute(builder: (_) => const RegisterScreen())),
            child: const Text('Create Account'),
          ),
          const SizedBox(height: 18),
          const AppFooter(),
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
                Text(
                  app.user?.name ?? 'Customer',
                  style: const TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                Text(
                  app.user?.email ?? '',
                  style: const TextStyle(color: _muted),
                ),
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
        const SizedBox(height: 18),
        const AppFooter(),
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
          const SectionHeader(
            title: 'Welcome back',
            subtitle: 'Sign in to manage cart and orders',
          ),
          const SizedBox(height: 18),
          AppTextField(
            controller: email,
            label: 'Email',
            keyboardType: TextInputType.emailAddress,
          ),
          AppTextField(
            controller: password,
            label: 'Password',
            obscureText: true,
          ),
          FilledButton(
            onPressed: loading ? null : submit,
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
            ),
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
          AppTextField(
            controller: email,
            label: 'Email',
            keyboardType: TextInputType.emailAddress,
          ),
          AppTextField(
            controller: phone,
            label: 'Phone',
            keyboardType: TextInputType.phone,
          ),
          AppTextField(
            controller: password,
            label: 'Password',
            obscureText: true,
          ),
          FilledButton(
            onPressed: loading ? null : submit,
            style: FilledButton.styleFrom(
              backgroundColor: _accent,
              foregroundColor: _background,
            ),
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
        Text(
          title,
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
        ),
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
    if (url == null) {
      return ClipRRect(
        borderRadius: BorderRadius.circular(14),
        child: placeholder,
      );
    }
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
  const DetailRow({
    required this.label,
    required this.value,
    this.valueColor,
    super.key,
  });

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
            style: TextStyle(
              color: valueColor ?? Colors.white,
              fontWeight: FontWeight.w800,
            ),
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
          Text(
            title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          ),
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
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: _muted),
            ),
            const SizedBox(height: 18),
            FilledButton(
              onPressed: () => Navigator.of(
                context,
              ).push(MaterialPageRoute(builder: (_) => const LoginScreen())),
              style: FilledButton.styleFrom(
                backgroundColor: _accent,
                foregroundColor: _background,
              ),
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
