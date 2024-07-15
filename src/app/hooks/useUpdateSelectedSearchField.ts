import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { setSelectedSearchFieldValue } from "../redux/features/hotelSearchApiSlice";
const useUpdateSelectedSearchField = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    if (pathname === "/") {
      dispatch(setSelectedSearchFieldValue(""));
    } else if (pathname.includes("/hotel/detail")) {
      const queryInput = params.get("queryInput");
      dispatch(setSelectedSearchFieldValue(queryInput));
    }
  }, [pathname, dispatch, params]);
};

export default useUpdateSelectedSearchField;
