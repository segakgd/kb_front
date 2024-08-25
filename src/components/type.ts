import {ProjectStatusEnum} from "@/components/common";

export type Project = {
  id: Number,
  name: String,
  status: ProjectStatusEnum,
  activeTo: String,
  orderCount: Number,
  botCount: Number,
}

export type Paginate = {
  currentPage: Number,
  lastPage: Number,
  nextPage: Number,
  totalItems: Number,
  totalPages: Number,
}
