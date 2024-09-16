export type TRes<T> = {
   status: string;
   code: number;
   message: string;
   metaData: T;
};

export type TResPagination<T> = {
   status: string;
   code: number;
   message: string;
   metaData: {
      page: number;
      pageSize: number;
      totalPage: number;
      totalItem: number;
      items: T;
   };
};
