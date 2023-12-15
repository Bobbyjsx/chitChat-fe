import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/*Provides a singleton query client*/
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
