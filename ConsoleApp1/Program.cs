using System.Drawing;
using System.Drawing.Imaging;

namespace ImageConverter;

internal class Program
{
    private static void Main(string[] args)
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
            using (var image = Image.FromFile(file))
            {
                // Create a new filename for the low quality image
                var newFilename = Path.GetFileNameWithoutExtension(file) + "_low.jpg";
                var newPath = Path.Combine(Path.GetDirectoryName(file), newFilename);

                // Set the JPEG quality to 20 (you can adjust this if you want)
                var qualityParam = new EncoderParameter(Encoder.Quality, 20L);
                var encoderParams = new EncoderParameters(1);
                encoderParams.Param[0] = qualityParam;

                // Save the low quality image with the _low suffix
                var jpegCodec = GetEncoderInfo("image/jpeg");
                image.Save(newPath, jpegCodec, encoderParams);
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