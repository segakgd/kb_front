import {ProjectStatusEnum} from "@/components/common";

export type Project = {
  id: Number,
  name: String,
  status: ProjectStatusEnum,
  activeTo: String,
  orderCount: Number,
  botCount: Number,
}
