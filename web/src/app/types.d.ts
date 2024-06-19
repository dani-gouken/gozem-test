type DeliveryStatus =
  | 'open'
  | 'picked-up'
  | 'in-transit'
  | 'delivered'
  | 'failed';
type Package = {
  package_id?: number;
  weight: number;
  width: number;
  depth: number;
  active_delivery: Delivery | null;
  description: string;
  from_name: string;
  from_address: string;
  from_location: {
    lat: number;
    lng: number;
  };
  to_name: string;
  to_address: string;
  to_location: {
    lat: number;
    lng: number;
  };
};

type Delivery = {
  delivery_id?: string;
  package_id: string;
  location: {
    lat: number;
    lng: number;
  };
  package: Package;
  status: DeliveryStatus;
  pickup_time?: string;
  start_time?: string;
  end_time?: string;
  createdAt: string;
  updatedAt: string;
};
