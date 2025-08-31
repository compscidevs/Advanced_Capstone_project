<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Agreement;
use Illuminate\Support\Facades\File;

class AgreementController extends Controller
{
    public function processDummyRequest()
    {
        // Read dummy request.json (place it in storage/app/public/request.json)
        $jsonPath = storage_path('app/public/request.json');
        if (!File::exists($jsonPath)) {
            return response()->json(['error' => 'request.json not found'], 404);
        }

        $requestData = json_decode(File::get($jsonPath), true);

        // Simulate user creation/lookup
        $partyA = User::firstOrCreate(['phone_number' => $requestData['party_a_phone']], ['name' => $requestData['party_a_name'] ?? null]);
        $partyB = User::firstOrCreate(['phone_number' => $requestData['party_b_phone']], ['name' => $requestData['party_b_name'] ?? null]);

        // Simulate NLP extraction from 'raw_text' (dummy parsing)
        $rawText = $requestData['raw_text'];
        $extractedTerms = $this->extractTerms($rawText);

        // Create agreement
        $agreement = Agreement::create([
            'party_a_phone' => $partyA->phone_number,
            'party_b_phone' => $partyB->phone_number,
            'extracted_terms' => json_encode($extractedTerms),
            'status' => 'pending_confirmation',
        ]);

        // Generate response.json (simulating USSD confirmation prompt)
        $responseData = [
            'agreement_id' => $agreement->id,
            'message' => "Swahara Contract {$agreement->id}: You agree to {$extractedTerms['action']} {$extractedTerms['quantity']} {$extractedTerms['item']} for {$extractedTerms['price']} by {$extractedTerms['deadline']}. Confirm?",
            'options' => ['1' => 'Confirm', '2' => 'Reject'],
        ];
        $responsePath = storage_path('app/public/response.json');
        File::put($responsePath, json_encode($responseData, JSON_PRETTY_PRINT));

        return response()->json(['success' => 'Agreement processed, response.json generated.']);
    }

    // Dummy NLP: Simple regex/string parsing
    private function extractTerms($text)
    {
        // Example: Parse "sell 100kg of maize to Amina for 200,000 Ugandan Shillings by Friday"
        preg_match('/(\d+)kg of (\w+)/', $text, $quantityItem);
        preg_match('/for (\d+,\d+) Ugandan Shillings/', $text, $price);
        preg_match('/by (\w+)/', $text, $deadline);

        return [
            'action' => str_contains($text, 'sell') ? 'sell' : 'buy',
            'quantity' => $quantityItem[1] ?? 'unknown',
            'item' => $quantityItem[2] ?? 'unknown',
            'price' => $price[1] ?? 'unknown',
            'deadline' => $deadline[1] ?? 'unknown',
        ];
    }

    // For admin dashboard: List agreements
    public function index()
    {
        $agreements = Agreement::all();
        return view('agreements.index', compact('agreements'));
    }
}