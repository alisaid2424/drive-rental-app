type BookingSummaryArgs = {
  pickupDateTime: string | undefined | null;
  returnDateTime: string | undefined | null;
  pricePerDay: number;
};

export const calculateBookingSummary = ({
  pickupDateTime,
  returnDateTime,
  pricePerDay,
}: BookingSummaryArgs) => {
  if (!pickupDateTime || !returnDateTime) {
    const defaultDays = 1;
    const defaultFee = Math.round(pricePerDay * defaultDays * 0.05);
    return {
      rentalDays: defaultDays,
      serviceFee: defaultFee,
      total: pricePerDay * defaultDays + defaultFee,
    };
  }

  const start = new Date(pickupDateTime);
  const end = new Date(returnDateTime);
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  const rentalDays = diffInDays > 0 ? diffInDays : 1;
  const serviceFee = Math.round(pricePerDay * rentalDays * 0.05);
  const total = pricePerDay * rentalDays + serviceFee;

  return {
    rentalDays,
    serviceFee,
    total,
  };
};
