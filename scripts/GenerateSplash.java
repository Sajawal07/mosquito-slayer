import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class GenerateSplash {
    public static void main(String[] args) throws Exception {
        File srcFile = new File("images/splash.png");
        if (!srcFile.exists()) {
            srcFile = new File("public/assets/images/splash.png");
        }
        System.out.println("Reading splash image: " + srcFile.getAbsolutePath());
        BufferedImage src = ImageIO.read(srcFile);

        String resPath = "android/app/src/main/res/";

        // Portrait densities (width x height)
        int[][] splashSizesPort = {
            {480, 800},    // port-mdpi
            {720, 1280},   // port-hdpi
            {960, 1600},   // port-xhdpi
            {1080, 1920},  // port-xxhdpi
            {1440, 2560}   // port-xxxhdpi
        };
        String[] densities = {"mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"};

        for (int i = 0; i < densities.length; i++) {
            String density = densities[i];
            File dirPort = new File(resPath + "drawable-port-" + density);
            File dirLand = new File(resPath + "drawable-land-" + density);
            dirPort.mkdirs();
            dirLand.mkdirs();

            int pw = splashSizesPort[i][0];
            int ph = splashSizesPort[i][1];

            // Portrait splash - crop/fit
            BufferedImage pImg = fitToScreen(src, pw, ph);
            ImageIO.write(pImg, "png", new File(dirPort, "splash.png"));

            // Landscape splash - fit/cover
            BufferedImage lImg = fitToScreen(src, ph, pw);
            ImageIO.write(lImg, "png", new File(dirLand, "splash.png"));

            System.out.println("Updated splash for " + density + " (" + pw + "x" + ph + ")");
        }
        System.out.println("NATIVE SPLASH SCREENS UPDATED!");
    }

    private static BufferedImage fitToScreen(BufferedImage src, int targetW, int targetH) {
        BufferedImage out = new BufferedImage(targetW, targetH, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = out.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Aspect fill/cover calculation
        double srcRatio = (double) src.getWidth() / src.getHeight();
        double targetRatio = (double) targetW / targetH;

        int drawW, drawH, drawX, drawY;
        if (srcRatio > targetRatio) {
            drawH = targetH;
            drawW = (int) (targetH * srcRatio);
            drawX = (targetW - drawW) / 2;
            drawY = 0;
        } else {
            drawW = targetW;
            drawH = (int) (targetW / srcRatio);
            drawX = 0;
            drawY = (targetH - drawH) / 2;
        }

        g.setColor(new Color(10, 10, 20));
        g.fillRect(0, 0, targetW, targetH);
        g.drawImage(src, drawX, drawY, drawW, drawH, null);
        g.dispose();
        return out;
    }
}
