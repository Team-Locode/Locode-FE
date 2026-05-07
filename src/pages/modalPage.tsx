import { useState } from "react";
import Card from "../component/Card";

export default function ModalPage() {
  return (
    <div className="flex flex-col items-center w-full p-8">
      <div className="bg-pink p-6 border border-pink-2 rounded-lg">
        <h2 className="text-pink-4 text-2xl font-bold mb-4">
          🤍 소중한 사람을 위한 꽃다발 만들기
        </h2>
        <div className="flex items-center gap-2 text-lg font-medium text-pink-4"></div>
      </div>
    </div>
  );
}

ModalPage;
