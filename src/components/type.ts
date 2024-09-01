import {ProjectStatusEnum} from "@/components/common";

export type Project = {
  id: Number,
  name: String,
  status: ProjectStatusEnum,
  activeTo: String,
  orderCount: Number,
  botCount: Number,
}

export type Scenario = {
  id: Number,
  name: String,
  active: Boolean,
  template: String,
  updatedAt: String,
  createdAt: String,
}

export type Paginate = {
  currentPage: Number,
  lastPage: Number,
  nextPage: Number,
  totalItems: Number,
  totalPages: Number,
}
