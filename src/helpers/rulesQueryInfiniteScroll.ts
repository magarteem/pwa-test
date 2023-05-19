export const rulesQueryInfiniteScroll = (previousArg: any, currentArg: any, endpointState: any) => {
 const notDoubleFetch = endpointState?.data;

 if (
  notDoubleFetch?.isNextPage &&
  previousArg &&
  currentArg &&
  currentArg !== previousArg &&
  currentArg?.page > previousArg?.page
 )
  return true;
 else return false;
};
