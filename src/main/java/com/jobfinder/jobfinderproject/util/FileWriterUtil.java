package com.jobfinder.jobfinderproject.util;

import com.jobfinder.jobfinderproject.entity.User;

import java.io.*;
import java.nio.file.*;

public class FileWriterUtil {

    private static final String FILE_PATH = "src/main/resources/user-data/users.csv";

    public static void writeUserToCsv(User user) {
        try {
            Path path = Paths.get(FILE_PATH);

            // klasör yoksa oluştur
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }

            boolean fileExists = Files.exists(path);

            try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_PATH, true))) {
                if (!fileExists) {
                    writer.write("id,fullName,email,phone,experience,militaryStatus,cvText");
                    writer.newLine();
                }

                String line = String.format("%d,%s,%s,%s,%s,%s,%s",
                        user.getId(),
                        escapeCsv(user.getFullName()),
                        user.getEmail(),
                        user.getPhone(),
                        escapeCsv(user.getExperience()),
                        escapeCsv(user.getMilitaryStatus()),
                        escapeCsv(user.getCvText())
                );

                writer.write(line);
                writer.newLine();
            }

        } catch (IOException e) {
            System.err.println("CSV'ye yazılamadı: " + e.getMessage());
        }
    }

    private static String escapeCsv(String text) {
        if (text == null) return "";
        return text.replace(",", ";"); // virgül varsa bozmasın
    }
}
