import React, { Suspense } from 'react';
import ContactClient from './ContactClient';

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090e] pt-32 text-center text-gray-400">
          Loading contact portal...
        </div>
      }
    >
      <ContactClient />
    </Suspense>
  );
}
