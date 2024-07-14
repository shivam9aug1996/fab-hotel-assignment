export interface HotelData {
  hotelID: string;
  item: string;
}

export interface SearchResultsProps {
  googleData: { data: { description: string; place_id: string }[] };
  hotelData: { data: HotelData[] };
  isFetchingGooglePlaceData: boolean;
  isFetchingHotelData: boolean;
  handleSelect: (item: string) => void;
  input: string;
}

export interface HotelDetail {
  title: string;
  description: string;
  address: string;
  hotelID: string;
}

export interface DetailByIdProps {
  params: {
    hotelID?: string;
  };
}

export interface HotelDetailApiResponse {
  data: {
    byPlace?: HotelDetail[];
    byHotelId?: HotelDetail;
  };
}

export interface DetailByPlaceProps {
  params: {
    place?: string;
  };
}
