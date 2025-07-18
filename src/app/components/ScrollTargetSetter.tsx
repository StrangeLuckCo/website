"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollTargetSetter({
  setScrollTarget,
}: {
  setScrollTarget: (v: string | null | undefined) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const value = searchParams?.get("scrollTo");
    setScrollTarget(value);
  }, [searchParams, setScrollTarget]);

  return null;
}
