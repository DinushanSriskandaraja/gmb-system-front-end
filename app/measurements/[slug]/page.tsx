"use client";

import { use, Suspense } from "react";
import { MeasurementPageContent } from "../new/page";

export default function FilePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Measurement Sheet...</div>}>
      <MeasurementPageContent measurementId={slug} isReadOnly={true} />
    </Suspense>
  );
}
