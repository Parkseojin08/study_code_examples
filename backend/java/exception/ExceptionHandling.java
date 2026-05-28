// 커스텀 예외
class AppException extends RuntimeException {
    private final String code;
    private final int status;

    AppException(String message, String code, int status) {
        super(message);
        this.code   = code;
        this.status = status;
    }

    public String getCode()   { return code; }
    public int    getStatus() { return status; }
}

class NotFoundException extends AppException {
    NotFoundException(String resource) {
        super(resource + " 없음", "NOT_FOUND", 404);
    }
}

class ValidationException extends AppException {
    ValidationException(String msg) {
        super(msg, "BAD_REQUEST", 400);
    }
}

public class ExceptionHandling {

    static String findUser(int id) {
        if (id <= 0) throw new ValidationException("id는 양수");
        if (id > 100) throw new NotFoundException("유저");
        return "유저" + id;
    }

    public static void main(String[] args) {

        // 기본 try / catch / finally
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("에러: " + e.getMessage());
        } finally {
            System.out.println("항상 실행");
        }

        // 커스텀 예외
        try {
            findUser(999);
        } catch (NotFoundException e) {
            System.out.println("404: " + e.getMessage());
        } catch (ValidationException e) {
            System.out.println("400: " + e.getMessage());
        } catch (AppException e) {
            System.out.println(e.getStatus() + ": " + e.getMessage());
        }

        // try-with-resources - close() 자동 호출
        // try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
        //     String line = br.readLine();
        // } catch (IOException e) {
        //     e.printStackTrace();
        // }

        System.out.println("종료");
    }
}
