// import { RowDataPacket } from "mysql2";

export interface IProduct {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: string
  image: string
  created_at: string
}

// export interface IUpdateProduct {
//   name: string
//   description: string
//   price: number
//   stock: number
//   category: string
//   image: string
// }