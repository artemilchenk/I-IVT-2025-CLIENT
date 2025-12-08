import axios from "axios";
import { httpClient } from "@/services/httpClient.ts";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import type { QueryClient } from "@tanstack/react-query";

export class GalleryClient {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  async deleteGallery(id: string): Promise<{ id: string }> {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${httpClient.baseUrl}/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async createGallery(dto: TBaseGallery) {
    const token = localStorage.getItem("token");

    const response = await axios.post<IGalleryCreateResponse>(
      `${httpClient.baseUrl}/gallery`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  async updateGallery({
    dto,
    id,
  }: {
    dto: TBaseGallery;
    id: string;
  }): Promise<IGalleryCreateResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.post<IGalleryCreateResponse>(
      `${httpClient.baseUrl}/gallery/${id}`,
      dto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async fetchGalleries(): Promise<IGalleryCreateResponse[]> {
    const token = localStorage.getItem("token");

    const response = await axios.get<IGalleryCreateResponse[]>(
      `${httpClient.baseUrl}/gallery`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async fetchGallery(id: string): Promise<IGalleryCreateResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.get<IGalleryCreateResponse>(
      `${httpClient.baseUrl}/gallery/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  getGalleriesData() {
    return this.queryClient.getQueryData<IGalleryCreateResponse[]>([
      "galleries",
    ]);
  }

  setGalleriesData(galleries: IGalleryCreateResponse[]) {
    this.queryClient.setQueryData(["galleries"], galleries);
  }
}
