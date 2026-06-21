import 'package:flutter_test/flutter_test.dart';

import 'package:nextdigihome_flutter/main.dart';

void main() {
  testWidgets('Next Digi Home app starts', (WidgetTester tester) async {
    await tester.pumpWidget(const NextDigiHomeApp());
    await tester.pump();

    expect(find.text('Next Digi Home'), findsOneWidget);
  });
}
