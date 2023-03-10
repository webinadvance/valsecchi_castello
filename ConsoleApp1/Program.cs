namespace ImageConverter;

internal class Program
{
    private static void Main(string[] args)
    {
        // Specify the path to the directory containing the images
        var path = @"C:\path\to\directory";

        // Get a list of all the JPG files in the directory
        var files = Directory.GetFiles(path, "*.jpg");

        // Loop through each file and convert it to a lower quality JPEG with the _low suffix
        foreach (var file in files)
            // Open the original image
            using (System.Drawing.Image image = System.Drawing.Image.FromFile(file))
            {
                // Create a new filename for the low quality image
                var newFilename = Path.GetFileNameWithoutExtension(file) + "_low.jpg";
                var newPath = Path.Combine(path, newFilename);

                // Set the JPEG quality to 50 (you can adjust this if you want)
                System.Drawing.Imaging.EncoderParameter qualityParam =
                    new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 50L);
                System.Drawing.Imaging.EncoderParameters
                    encoderParams = new System.Drawing.Imaging.EncoderParameters(1);
                encoderParams.Param[0] = qualityParam;

                // Save the low quality image with the _low suffix
                System.Drawing.Imaging.ImageCodecInfo jpegCodec = GetEncoderInfo("image/jpeg");
                image.Save(newPath, jpegCodec, encoderParams);
            }

        Console.WriteLine("Done.");
    }

    // Helper method to get the JPEG encoder info
    private static System.Drawing.Imaging.ImageCodecInfo GetEncoderInfo(string mimeType)
    {
        System.Drawing.Imaging.ImageCodecInfo[] codecs = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
        foreach (System.Drawing.Imaging.ImageCodecInfo codec in codecs)
            if (codec.MimeType == mimeType)
                return codec;
        return null;
    }
}