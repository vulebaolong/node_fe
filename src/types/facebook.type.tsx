export type TLoginFacebookReq = {
   name: string;
   email: string;
   picture: Picture;
   id: string;
};

export type Picture = {
   data: Data;
};

export type Data = {
   height: number;
   is_silhouette: boolean;
   url: string;
   width: number;
};
