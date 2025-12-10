import axios from "axios";
import { httpClient } from "@/services/httpClient.ts";
import type {
  IGalleryCreateResponse,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import type { QueryClient } from "@tanstack/react-query";
import { tokenService } from "@/services/tokenService.ts";

export class GalleryClient {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async deleteGallery(id: string): Promise<{ id: string }> {
    const token = tokenService.getToken();

    const response = await axios.delete(`${httpClient.baseUrl}/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async createGallery(dto: TBaseGallery) {
    const token = tokenService.getToken();

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
    const token = tokenService.getToken();

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
    const token = tokenService.getToken();

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
    const token = tokenService.getToken();

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
