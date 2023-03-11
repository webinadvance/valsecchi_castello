using System.Drawing;
using System.Drawing.Imaging;
using System.Text;
using System.Text.Json;
using Encoder = System.Drawing.Imaging.Encoder;

namespace ImageConverter;

internal class Program
{
    private static void Main(string[] args)
    {
        CreateLowRes();
        CreateJsonGallery();
    }

    private static void CreateJsonGallery()
    {
        var rootPath =
            @"C:\Users\webin\RiderProjects\valsecchi_castello\ASP.NETCoreWebApplication5\ClientApp\public\assets";
        var directories = new List<object>();

        foreach (var subdirectory in Directory.GetDirectories(rootPath))
        {
            var directoryData = new List<object>();
            var directoryName = new DirectoryInfo(subdirectory).Name;

            foreach (var file in Directory.GetFiles(subdirectory, "*.jpg")
                         .Where(path => !path.EndsWith("_low.jpg")))
            {
                var fileName = Path.GetFileName(file);

                directoryData.Add(new
                {
                    src = $"/{directoryName}/{fileName}",
                    title = fileName
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

        var filePath =
            Path.Combine(
                @"C:\Users\webin\RiderProjects\valsecchi_castello\ASP.NETCoreWebApplication5\ClientApp\public\data",
                "gallery.json");
        System.IO.File.WriteAllText(filePath, json);
    }


    private static void CreateLowRes()
    {
        // Specify the path to the directory containing the images
        var path =
            @"C:\Users\webin\RiderProjects\valsecchi_castello\ASP.NETCoreWebApplication5\ClientApp\public\assets\";

        // Get a list of all the JPG files in the directory and subdirectories
        var files = Directory.GetFiles(path, "*.jpg", SearchOption.AllDirectories);

        // Loop through each file and convert it to a lower quality JPEG with the _low suffix
        foreach (var file in files)
        {
            // Skip files that already have the _low suffix
            if (file.EndsWith("_low.jpg"))
                continue;

            // Open the original image
            using (var originalImage = Image.FromFile(file))
            {
                // Calculate the new height and width while maintaining the aspect ratio
                var originalWidth = originalImage.Width;
                var originalHeight = originalImage.Height;
                var ratio = originalWidth / (double)originalHeight;
                var newWidth = Math.Min(originalWidth, 500);
                var newHeight = (int)Math.Round(newWidth / ratio);

                // Create a new Bitmap with the new size
                using (var resizedImage = new Bitmap(originalImage, newWidth, newHeight))
                {
                    // Set the JPEG quality to 20 (you can adjust this if you want)
                    var qualityParam = new EncoderParameter(Encoder.Quality, 100L);
                    var encoderParams = new EncoderParameters(1);
                    encoderParams.Param[0] = qualityParam;

                    // Create a new filename for the low quality image
                    var newFilename = Path.GetFileNameWithoutExtension(file) + "_low.jpg";
                    var newPath = Path.Combine(Path.GetDirectoryName(file), newFilename);

                    // Save the resized and lower quality image with the _low suffix
                    var jpegCodec = GetEncoderInfo("image/jpeg");
                    resizedImage.Save(newPath, jpegCodec, encoderParams);
                }
            }
        }

        Console.WriteLine("Done.");
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