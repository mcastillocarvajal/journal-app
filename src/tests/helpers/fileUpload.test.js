import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'mcastillo', 
    api_key: '436254185347393', 
    api_secret: '0gKKYfsFO46x2UwKo6TJKFpnrk0',
    secure: true
  });


describe('test for fileUpload.js', () => {

    test('should load a file and return URL', async() => {

        const resp = await fetch('https://images.unsplash.com/photo-1487260211189-670c54da558d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2ltcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')
        const blob = await resp.blob();

        const file = new File( [blob], 'img.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // id to delete img
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        cloudinary.v2.api.delete_resources(imageId);
    })

    test('should return an error', async() => {

        const file = new File( [], 'img.png');
        const url = await fileUpload( file );

        expect( url ).toBe(null);
    })
    
})
