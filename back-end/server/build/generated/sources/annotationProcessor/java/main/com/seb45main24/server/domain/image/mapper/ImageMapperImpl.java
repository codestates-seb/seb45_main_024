package com.seb45main24.server.domain.image.mapper;

import com.seb45main24.server.domain.image.dto.UploadImage;
import com.seb45main24.server.domain.image.entity.Image;
import com.seb45main24.server.domain.image.entity.Image.ImageBuilder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-18T21:40:53+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class ImageMapperImpl implements ImageMapper {

    @Override
    public Image uploadImageToImage(UploadImage image) {
        if ( image == null ) {
            return null;
        }

        ImageBuilder image1 = Image.builder();

        image1.imageName( image.getImageName() );
        image1.imageUrl( image.getImageUrl() );
        image1.imageType( image.getImageType() );

        return image1.build();
    }
}
