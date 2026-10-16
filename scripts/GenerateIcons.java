import java.awt.*;
import java.awt.geom.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class GenerateIcons {
    public static void main(String[] args) throws Exception {
        File srcFile = new File("images/game_icon.png");
        if (!srcFile.exists()) {
            srcFile = new File("dist/assets/images/game_icon.png");
        }
        System.out.println("Reading source icon: " + srcFile.getAbsolutePath());
        BufferedImage src = ImageIO.read(srcFile);

        int[][] mipmapSizes = {
            {48, 108},   // mdpi
            {72, 162},   // hdpi
            {96, 216},   // xhdpi
            {144, 324},  // xxhdpi
            {192, 432}   // xxxhdpi
        };
        String[] densities = {"mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"};

        String resPath = "android/app/src/main/res/";

        for (int i = 0; i < densities.length; i++) {
            String density = densities[i];
            int size = mipmapSizes[i][0];
            int fgSize = mipmapSizes[i][1];
            File dir = new File(resPath + "mipmap-" + density);
            dir.mkdirs();

            // 1. Regular ic_launcher.png
            BufferedImage launcher = resize(src, size, size, false);
            ImageIO.write(launcher, "png", new File(dir, "ic_launcher.png"));

            // 2. Round ic_launcher_round.png
            BufferedImage round = resize(src, size, size, true);
            ImageIO.write(round, "png", new File(dir, "ic_launcher_round.png"));

            // 3. Foreground ic_launcher_foreground.png (with safe zone padding: 66% size centered)
            BufferedImage fg = createForeground(src, fgSize);
            ImageIO.write(fg, "png", new File(dir, "ic_launcher_foreground.png"));

            System.out.println("Generated mipmap-" + density + " (size " + size + "x" + size + ")");
        }

        // Play Store 512x512 High-Res Icon
        File playStoreDir = new File("playstore_assets");
        playStoreDir.mkdirs();

        BufferedImage icon512 = resize(src, 512, 512, false);
        ImageIO.write(icon512, "png", new File(playStoreDir, "playstore_icon_512.png"));
        System.out.println("Generated playstore_assets/playstore_icon_512.png");

        // Play Store 1024x500 Feature Graphic
        BufferedImage feature = createFeatureGraphic(src, 1024, 500);
        ImageIO.write(feature, "png", new File(playStoreDir, "playstore_feature_graphic_1024x500.png"));
        System.out.println("Generated playstore_assets/playstore_feature_graphic_1024x500.png");

        // Splash screens for landscape and portrait
        generateSplashScreens(src, resPath);

        System.out.println("ALL ICONS AND ASSETS SUCCESSFULLY GENERATED!");
    }

    private static BufferedImage resize(BufferedImage src, int width, int height, boolean round) {
        BufferedImage out = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = out.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        if (round) {
            g.setClip(new Ellipse2D.Float(0, 0, width, height));
        }
        g.drawImage(src, 0, 0, width, height, null);
        g.dispose();
        return out;
    }

    private static BufferedImage createForeground(BufferedImage src, int size) {
        BufferedImage out = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = out.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int iconSize = (int)(size * 0.72);
        int offset = (size - iconSize) / 2;
        g.drawImage(src, offset, offset, iconSize, iconSize, null);
        g.dispose();
        return out;
    }

    private static BufferedImage createFeatureGraphic(BufferedImage src, int width, int height) {
        BufferedImage out = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = out.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Dark gradient background matching mosquito game theme
        GradientPaint gp = new GradientPaint(0, 0, new Color(15, 15, 25), width, height, new Color(40, 10, 20));
        g.setPaint(gp);
        g.fillRect(0, 0, width, height);

        // Draw icon centered on left/middle
        int iconSize = 360;
        int iconY = (height - iconSize) / 2;
        int iconX = 80;
        g.drawImage(src, iconX, iconY, iconSize, iconSize, null);

        // Draw title text
        g.setColor(Color.WHITE);
        g.setFont(new Font("SansSerif", Font.BOLD, 54));
        g.drawString("MOSQUITO SLAYER", 480, 230);

        g.setColor(new Color(255, 204, 0));
        g.setFont(new Font("SansSerif", Font.BOLD, 28));
        g.drawString("Action Tap & Hunt Game", 480, 280);

        g.setColor(new Color(0, 255, 128));
        g.setFont(new Font("SansSerif", Font.PLAIN, 22));
        g.drawString("Optimized for Phones & Tablets", 480, 330);

        g.dispose();
        return out;
    }

    private static void generateSplashScreens(BufferedImage src, String resPath) throws Exception {
        int[][] splashSizesLand = {
            {800, 480, 1},    // land-mdpi
            {1280, 720, 2},   // land-hdpi
            {1600, 960, 3},   // land-xhdpi
            {1920, 1080, 4},  // land-xxhdpi
            {2560, 1440, 5}   // land-xxxhdpi
        };
        String[] densities = {"mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"};

        for (int i = 0; i < densities.length; i++) {
            String density = densities[i];
            File dirLand = new File(resPath + "drawable-land-" + density);
            File dirPort = new File(resPath + "drawable-port-" + density);
            dirLand.mkdirs();
            dirPort.mkdirs();

            int w = splashSizesLand[i][0];
            int h = splashSizesLand[i][1];

            // Landscape splash
            BufferedImage landSplash = createSplashScreen(src, w, h);
            ImageIO.write(landSplash, "png", new File(dirLand, "splash.png"));

            // Portrait splash
            BufferedImage portSplash = createSplashScreen(src, h, w);
            ImageIO.write(portSplash, "png", new File(dirPort, "splash.png"));
        }
    }

    private static BufferedImage createSplashScreen(BufferedImage src, int width, int height) {
        BufferedImage out = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = out.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        g.setColor(new Color(10, 10, 15));
        g.fillRect(0, 0, width, height);

        int iconSize = Math.min(width, height) / 3;
        int x = (width - iconSize) / 2;
        int y = (height - iconSize) / 2 - 30;
        g.drawImage(src, x, y, iconSize, iconSize, null);

        g.setColor(Color.WHITE);
        g.setFont(new Font("SansSerif", Font.BOLD, Math.max(20, iconSize / 6)));
        FontMetrics fm = g.getFontMetrics();
        String title = "MOSQUITO SLAYER";
        int textX = (width - fm.stringWidth(title)) / 2;
        int textY = y + iconSize + 40;
        g.drawString(title, textX, textY);

        g.dispose();
        return out;
    }
}
