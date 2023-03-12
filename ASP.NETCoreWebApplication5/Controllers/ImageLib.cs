using System;
using System.Drawing.Imaging;
using System.Text;
using System.Text.Json;

public static class ImageLib
{
    private static IWebHostEnvironment webHostEnvironment;

    public static void Sync(IWebHostEnvironment _webHostEnvironment)
    {
        webHostEnvironment = _webHostEnvironment;
        CreateLowRes();
        CreateJsonGallery();
    }

    private static void CreateJsonGallery()
    {
#if DEBUG
        var rootPath = webHostEnvironment.ContentRootPath + "\\ClientApp\\public\\assets";
#else
        var rootPath = webHostEnvironment.ContentRootPath + "\\wwwroot\\assets";
#endif

        var directories = new List<object>();

        foreach (var subdirectory in System.IO.Directory.GetDirectories(rootPath))
        {
            var directoryData = new List<object>();
            var directoryName = new DirectoryInfo(subdirectory).Name;

            foreach (var file in System.IO.Directory.GetFiles(subdirectory, "*.jpg")
                         .Where(path => !path.EndsWith("_low.jpg")))
            {
                var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(file);

                directoryData.Add(new
                {
                    src = $"/{directoryName}/{fileNameWithoutExtension}.jpg",
                    title = fileNameWithoutExtension
                });
            }


            directories.Add(new
            {
                title = directoryName,
                data = directoryData
            });
        }

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(directories, options);
        var byteArray = Encoding.ASCII.GetBytes(json);
        var stream = new MemoryStream(byteArray);

#if DEBUG
        var filePath = webHostEnvironment.ContentRootPath + "\\ClientApp\\public\\data\\gallery.json";
#else
        var filePath = webHostEnvironment.ContentRootPath + "\\wwwroot\\data\\gallery.json";
#endif

        System.IO.File.WriteAllText(filePath, json);
    }


    private static void CreateLowRes()
    {
#if DEBUG
        var path = webHostEnvironment.ContentRootPath + "\\ClientApp\\public\\assets";
#else
        var path = webHostEnvironment.ContentRootPath + "\\wwwroot\\assets";
#endif
        // Get a list of all the JPG files in the directory and subdirectories
        var files = System.IO.Directory.GetFiles(path, "*.jpg", System.IO.SearchOption.AllDirectories);

        // Loop through each file and convert it to a lower quality JPEG with the _low suffix
        foreach (var file in files)
        {
            // Skip files that already have the _low suffix
            if (file.EndsWith("_low.jpg"))
                continue;

            // Open the original image
            using (var originalImage = System.Drawing.Image.FromFile(file))
            {
                // Calculate the new height and width while maintaining the aspect ratio
                var originalWidth = originalImage.Width;
                var originalHeight = originalImage.Height;
                var ratio = originalWidth / (double)originalHeight;
                var newWidth = Math.Min(originalWidth, 500);
                var newHeight = (int)Math.Round(newWidth / ratio);

                // Create a new Bitmap with the new size
                using (var resizedImage = new System.Drawing.Bitmap(originalImage, newWidth, newHeight))
                {
                    // Set the JPEG quality to 100
                    var qualityParam = new System.Drawing.Imaging.EncoderParameter(
                        System.Drawing.Imaging.Encoder.Quality,
                        100L);
                    var encoderParams = new System.Drawing.Imaging.EncoderParameters(1);
                    encoderParams.Param[0] = qualityParam;

                    // Create a new filename for the low quality image
                    var newFilename = System.IO.Path.GetFileNameWithoutExtension(file) + "_low.jpg";
                    var newPath = System.IO.Path.Combine(System.IO.Path.GetDirectoryName(file), newFilename);

                    // Save the resized and lower quality image with the _low suffix
                    var jpegCodec = GetEncoderInfo("image/jpeg");
                    resizedImage.Save(newPath, jpegCodec, encoderParams);
                }
            }
        }
    }


    // Helper method to get the JPEG encoder info
    private static ImageCodecInfo GetEncoderInfo(string mimeType)
    {
        var codecs = ImageCodecInfo.GetImageEncoders();
        foreach (var codec in codecs)
            if (codec.MimeType == mimeType)
                return codec;
        return null;
    }
}