import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Section,
} from "@react-email/components";

type EmailTemplateProps = {
  fullName: string;
  bookingId: string;
  vehicleName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string | Date;
  dropoffDate: string | Date;
  amount: number;
};

const formatDate = (dateVal: string | Date) => {
  if (!dateVal) return "N/A";
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? String(dateVal) : d.toDateString();
};

export const EmailTemplate = ({ body }: { body: EmailTemplateProps }) => {
  return (
    <Html>
      <Head />
      <Preview>Vehicle Booking Details</Preview>

      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            Your Vehicle Rental Details
          </Text>

          <Text>Dear {body.fullName || "Customer"},</Text>

          <Text>Thank you for your rental booking! Here are your details:</Text>

          <Section>
            <Text>
              <strong>Booking ID:</strong> {body.bookingId}
            </Text>
            <Text>
              <strong>Vehicle:</strong> {body.vehicleName}
            </Text>
            <Text>
              <strong>Pickup Location:</strong> {body.pickupLocation}
            </Text>
            <Text>
              <strong>Dropoff Location:</strong> {body.dropoffLocation}
            </Text>
            <Text>
              <strong>Pickup Date:</strong> {formatDate(body.pickupDate)}
            </Text>
            <Text>
              <strong>Dropoff Date:</strong> {formatDate(body.dropoffDate)}
            </Text>
            <Text>
              <strong>Total Amount:</strong> ${body.amount}
            </Text>
          </Section>

          <Text style={{ marginTop: "20px" }}>Have a safe trip!</Text>

          <Text>If you need to make any changes, feel free to contact us.</Text>
        </Container>
      </Body>
    </Html>
  );
};
