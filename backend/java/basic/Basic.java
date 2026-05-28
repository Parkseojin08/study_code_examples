public class Basic {
    public static void main(String[] args) {

        // 기본 자료형
        int    n   = 42;
        long   big = 100L;
        double d   = 3.14;
        boolean b  = true;
        char   c   = 'A';

        final int MAX = 100; // 상수

        // 문자열
        String name = "홍길동";
        System.out.println(name.length());           // 3
        System.out.println(name.contains("길"));     // true
        System.out.println(name.substring(0, 2));    // 홍길
        System.out.println(name.replace("홍", "김")); // 김길동
        System.out.println("  hello  ".trim());      // hello

        // 형 변환
        int parsed = Integer.parseInt("42");
        String str = String.valueOf(42);

        // 조건문
        int score = 85;
        String grade = switch (score / 10) {
            case 10, 9 -> "A";
            case 8     -> "B";
            default    -> "F";
        };

        // 반복문
        for (int i = 0; i < 5; i++) System.out.print(i + " ");

        int[] arr = {10, 20, 30};
        for (int val : arr) System.out.print(val + " ");

        // printf
        System.out.printf("이름: %s, 점수: %d%n", name, score);
    }
}
