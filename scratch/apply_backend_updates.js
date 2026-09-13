const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

console.log('=== 1. Update config/app.php ===');
const appConfigPath = path.join(backendDir, 'config', 'app.php');
let appConfig = fs.readFileSync(appConfigPath, 'utf8');
appConfig = appConfig.replace(
  /'name'\s*=>\s*env\('APP_NAME',\s*'[^']+'\)/,
  `'name' => env('APP_NAME', 'NextDigiHome')`
);
fs.writeFileSync(appConfigPath, appConfig, 'utf8');
console.log('Updated config/app.php');

console.log('\n=== 2. Update .env ===');
const envPath = path.join(backendDir, '.env');
if (fs.existsSync(envPath)) {
  let env = fs.readFileSync(envPath, 'utf8');
  env = env.replace(/^APP_NAME=.*$/m, `APP_NAME='NextDigiHome'`);
  fs.writeFileSync(envPath, env, 'utf8');
  console.log('Updated .env APP_NAME');
}

console.log('\n=== 3. Update database/seeders/SettingSeeder.php ===');
const settingSeederPath = path.join(backendDir, 'database', 'seeders', 'SettingSeeder.php');
let settingSeeder = `<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::updateOrCreate(
            ['id' => 1],
            [
                'site_title' => 'NextDigiHome',
                'site_description' => 'Technology, AI, software and digital growth solutions for modern businesses.',
                'admin_title' => 'NextDigiHome Admin',
                'admin_description' => 'NextDigiHome Technology Ecosystem & Multi-Division Management Console',    
                'site_logo' => 'logo.png',
                'site_copyright_text' => '© 2026 NextDigiHome. All rights reserved.',
                'admin_logo' => 'logo.png',
                'status' => 1,
                'created_by' => 1,
                'default_language' => 'en',
                'available_languages' => '["en"]',
                'auto_translate' => 0,
            ]
        );
    }
}
`;
fs.writeFileSync(settingSeederPath, settingSeeder, 'utf8');
console.log('Updated SettingSeeder.php');

console.log('\n=== 4. Update database/seeders/StatsSeeder.php ===');
const statsSeederPath = path.join(backendDir, 'database', 'seeders', 'StatsSeeder.php');
let statsSeeder = `<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatsSeeder extends Seeder
{
    public function run(): void
    {
        $stats = [
            [
                'key' => 'experience',
                'value' => '8+ Years',
                'label' => 'Combined Engineering Experience',
                'icon' => 'code-bracket',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'key' => 'platforms',
                'value' => 'Multiple',
                'label' => 'SaaS Platforms in Active Production',
                'icon' => 'cpu-chip',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'key' => 'ip_ownership',
                'value' => '100%',
                'label' => 'Code & IP Ownership',
                'icon' => 'shield-check',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'key' => 'sla_support',
                'value' => '24/7',
                'label' => 'Monitoring & SLA-Backed Support',
                'icon' => 'clock',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($stats as $stat) {
            Stat::updateOrCreate(
                ['key' => $stat['key']],
                $stat
            );
        }
    }
}
`;
fs.writeFileSync(statsSeederPath, statsSeeder, 'utf8');
console.log('Updated StatsSeeder.php');

console.log('\n=== 5. Update database/seeders/HeroSliderSeeder.php ===');
const heroSliderSeederPath = path.join(backendDir, 'database', 'seeders', 'HeroSliderSeeder.php');
let heroSliderSeeder = `<?php

namespace Database\Seeders;

use App\Models\HeroSlider;
use Illuminate\Database\Seeder;

class HeroSliderSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'title' => 'Build. Launch. Automate. Grow.',
                'subtitle' => 'Technology, AI & Software Ecosystem',
                'description' => 'We architect high-performance web applications, autonomous AI agents, performance growth marketing, and enterprise SaaS platforms.',
                'cta_text' => 'Explore Solutions',
                'cta_link' => '/solutions',
                'image' => 'https://via.placeholder.com/400x300/00d4aa/ffffff?text=Build+Launch+Automate+Grow',
                'background_color' => '#07090e',
                'text_color' => '#fafafa',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'NextDigi Solutions',
                'subtitle' => 'Custom Software & Web Engineering',
                'description' => 'Modern headless commerce, Flutter mobile apps, custom enterprise ERPs, and scalable SaaS infrastructure.',
                'cta_text' => 'Start a Project',
                'cta_link' => '/contact',
                'image' => 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=NextDigi+Solutions',
                'background_color' => '#07090e',
                'text_color' => '#fafafa',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'NextDigi AI & Labs',
                'subtitle' => 'Intelligent Agents & SaaS Platforms',
                'description' => 'Autonomous task agents, bilingual customer chatbots, workflow automation, and proprietary SaaS platforms.',
                'cta_text' => 'Explore AI Division',
                'cta_link' => '/ai',
                'image' => 'https://via.placeholder.com/400x300/38bdf8/ffffff?text=NextDigi+AI',
                'background_color' => '#07090e',
                'text_color' => '#fafafa',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlider::updateOrCreate(
                ['title' => $slide['title']],
                $slide
            );
        }
    }
}
`;
fs.writeFileSync(heroSliderSeederPath, heroSliderSeeder, 'utf8');
console.log('Updated HeroSliderSeeder.php');

console.log('\n=== 6. Update database/seeders/ContactInfoSeeder.php ===');
const contactInfoSeederPath = path.join(backendDir, 'database', 'seeders', 'ContactInfoSeeder.php');
let contactInfoSeeder = `<?php

namespace Database\Seeders;

use App\Models\ContactInfo;
use Illuminate\Database\Seeder;

class ContactInfoSeeder extends Seeder
{
    public function run(): void
    {
        $contacts = [
            [
                'type' => 'email',
                'title' => 'Email Us',
                'value' => 'info@nextdigihome.com',
                'description' => 'Technical proposals & commercial requests',
                'icon' => 'envelope',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'type' => 'phone',
                'title' => 'Call / WhatsApp',
                'value' => '+880 1918 329829',
                'description' => 'Saturday – Thursday: 10:00 AM – 7:00 PM BST',
                'icon' => 'phone',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'type' => 'address',
                'title' => 'Headquarters',
                'value' => 'Dhaka, Bangladesh',
                'description' => 'Global digital operations & engineering',
                'icon' => 'map-pin',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'type' => 'hours',
                'title' => 'Business Hours',
                'value' => 'Saturday - Thursday: 10:00 AM - 7:00 PM BST',
                'description' => '24/7 SLA emergency support for ongoing platforms',
                'icon' => 'clock',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($contacts as $contact) {
            ContactInfo::updateOrCreate(
                ['type' => $contact['type']],
                $contact
            );
        }
    }
}
`;
fs.writeFileSync(contactInfoSeederPath, contactInfoSeeder, 'utf8');
console.log('Updated ContactInfoSeeder.php');

console.log('\n=== 7. Update database/seeders/PageContentSeeder.php ===');
const pageContentSeederPath = path.join(backendDir, 'database', 'seeders', 'PageContentSeeder.php');
let pageContentSeeder = fs.readFileSync(pageContentSeederPath, 'utf8');
pageContentSeeder = pageContentSeeder.replace(/DigitalHub/g, 'NextDigiHome');
pageContentSeeder = pageContentSeeder.replace(
  /'content'\s*=>\s*'To democratize access to premium digital products and empower businesses of all sizes to achieve their full potential through innovative tools and resources\.'/,
  `'content' => 'To empower modern businesses with high-performance software engineering, autonomous AI workflows, predictable customer acquisition, and production-grade SaaS platforms.'`
);
fs.writeFileSync(pageContentSeederPath, pageContentSeeder, 'utf8');
console.log('Updated PageContentSeeder.php (Replaced DigitalHub with NextDigiHome)');

console.log('\n=== 8. Create ProjectInquiry Model ===');
const modelPath = path.join(backendDir, 'app', 'Models', 'ProjectInquiry.php');
const modelContent = `<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectInquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service',
        'budget',
        'timeline',
        'message',
        'status',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }
}
`;
fs.writeFileSync(modelPath, modelContent, 'utf8');
console.log('Created app/Models/ProjectInquiry.php');

console.log('\n=== 9. Create ProjectInquiry Migration ===');
const migrationPath = path.join(backendDir, 'database', 'migrations', '2026_09_13_000001_create_project_inquiries_table.php');
const migrationContent = `<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('project_inquiries')) {
            Schema::create('project_inquiries', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->string('phone');
                $table->string('company')->nullable();
                $table->string('service');
                $table->string('budget')->nullable();
                $table->string('timeline')->nullable();
                $table->text('message');
                $table->string('status')->default('new'); // new, in_review, contacted, closed
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('project_inquiries');
    }
};
`;
fs.writeFileSync(migrationPath, migrationContent, 'utf8');
console.log('Created migration 2026_09_13_000001_create_project_inquiries_table.php');

console.log('\n=== 10. Create InquiryController ===');
const controllerPath = path.join(backendDir, 'app', 'Http', 'Controllers', 'Api', 'InquiryController.php');
const controllerContent = `<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProjectInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $inquiries = ProjectInquiry::latest()->paginate(25);
        return response()->json([
            'success' => true,
            'data' => $inquiries,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:50',
            'company' => 'nullable|string|max:150',
            'service' => 'required|string|max:150',
            'budget' => 'nullable|string|max:100',
            'timeline' => 'nullable|string|max:100',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $inquiry = ProjectInquiry::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'company' => $request->input('company'),
                'service' => $request->input('service'),
                'budget' => $request->input('budget'),
                'timeline' => $request->input('timeline'),
                'message' => $request->input('message'),
                'status' => 'new',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            Log::info("New project inquiry received from: {$inquiry->name} ({$inquiry->email}) for service: {$inquiry->service}");

            return response()->json([
                'success' => true,
                'message' => 'Your project inquiry has been received. Our solutions team will contact you within 24 hours.',
                'data' => $inquiry,
            ], 201);
        } catch (\\Exception $e) {
            Log::error("Failed to save project inquiry: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to process inquiry. Please contact us directly via WhatsApp or email.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $inquiry = ProjectInquiry::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $inquiry,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:new,in_review,contacted,closed',
        ]);

        $inquiry = ProjectInquiry::findOrFail($id);
        $inquiry->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Inquiry status updated successfully',
            'data' => $inquiry,
        ]);
    }
}
`;
fs.writeFileSync(controllerPath, controllerContent, 'utf8');
console.log('Created app/Http/Controllers/Api/InquiryController.php');

console.log('\n=== 11. Register Inquiries route in routes/api.php ===');
const apiRoutesPath = path.join(backendDir, 'routes', 'api.php');
let apiRoutes = fs.readFileSync(apiRoutesPath, 'utf8');
if (!apiRoutes.includes('InquiryController')) {
  const insertMarker = `Route::middleware(['api'])->group(function () {\n    Route::post('/register'`;
  const replacement = `use App\Http\Controllers\Api\InquiryController;\n\nRoute::middleware(['api'])->group(function () {\n    Route::post('/inquiries', [InquiryController::class, 'store']);\n    Route::get('/inquiries', [InquiryController::class, 'index']);\n    Route::post('/register'`;
  apiRoutes = apiRoutes.replace(insertMarker, replacement);
  fs.writeFileSync(apiRoutesPath, apiRoutes, 'utf8');
  console.log('Registered inquiries routes in routes/api.php');
} else {
  console.log('InquiryController route already exists in routes/api.php');
}

console.log('\nBackend updates successfully applied!');
