package com.seb45main24.server.domain.image.mapper;

import org.mapstruct.Mapper;

import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;

@Mapper(componentModel = "spring")
public interface ImageMapper {

	Image uploadImageToImage(UploadImage image);
}
