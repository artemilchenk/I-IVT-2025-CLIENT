import axios from "axios";
import { httpClient } from "@/services/httpClient.ts";
import type {
  CreatePhotoResponse,
  IGalleriesResponse,
  IGalleryCreateResponse,
  PhotoInput,
  TBaseGallery,
} from "@/modules/gallery/types.ts";
import { tokenService } from "@/services/tokenService.ts";

export class GalleryApi {
  constructor() {}

  async deleteGallery(id: string): Promise<{ id: string }> {
    const token = tokenService.getToken();

    const response = await axios.delete(`${httpClient.baseUrl}/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async create<D extends object, R extends object>(
    dto: D,
    path: string,
  ): Promise<R> {
    const token = tokenService.getToken();

    const response = await axios.post<R>(`${httpClient.baseUrl}${path}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  createPhoto = async (value: PhotoInput & { galleryId: string }) => {
    return await this.create<PhotoInput, CreatePhotoResponse>(
      { buffer: value.buffer },
      `/gallery/photo/${value.galleryId}`,
    );
  };

  createGallery = async (dto: TBaseGallery) => {
    return await this.create<TBaseGallery, IGalleryCreateResponse>(
      dto,
      "/gallery",
    );
  };

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

  async movePhoto({
    id,
    targetContainerId,
  }: {
    id: string;
    targetContainerId: string;
  }): Promise<CreatePhotoResponse> {
    const token = tokenService.getToken();

    const response = await axios.post<CreatePhotoResponse>(
      `${httpClient.baseUrl}/gallery/photo/move`,
      { id, targetContainerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async fetchGalleries(page: number): Promise<IGalleriesResponse> {
    const token = tokenService.getToken();

    const response = await axios.get<IGalleriesResponse>(
      `${httpClient.baseUrl}/gallery?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async fetchPhotos(galleryId: string): Promise<CreatePhotoResponse[]> {
    const token = tokenService.getToken();

    const response = await axios.get<CreatePhotoResponse[]>(
      `${httpClient.baseUrl}/gallery/${galleryId}/photos`,
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
}

export const galleryApi = new GalleryApi();
