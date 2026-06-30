"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

const ViewDetailsButton = ({ order }: { order: any }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setSelectedOrder(order);
          setIsDetailsOpen(true);
        }}
        size="sm"
        variant="outline"
        className="w-9 h-9 rounded-full border-slate-200 hover:bg-blue-50 hover:border-blue-200"
      >
        <Eye className="size-4 text-blue-500" />
      </Button>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedOrder(null);
        }}
      />
    </>
  );
};

export default ViewDetailsButton;
