import java.util.*;
import java.util.stream.*;

public class Collections {
    public static void main(String[] args) {

        // ArrayList
        List<String> list = new ArrayList<>(Arrays.asList("바나나", "사과", "체리"));
        list.add("딸기");
        list.remove("사과");
        System.out.println(list.get(0));       // 바나나
        System.out.println(list.contains("체리")); // true
        list.sort(Comparator.naturalOrder());

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("홍길동", 95);
        scores.put("김철수", 82);
        scores.getOrDefault("없음", 0); // 없으면 기본값

        scores.forEach((name, score) -> System.out.println(name + ": " + score));

        // HashSet - 중복 없음
        Set<String> set = new HashSet<>(Arrays.asList("자바", "파이썬", "자바"));
        System.out.println(set.size()); // 2

        // Stream API
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6);

        List<Integer> result = nums.stream()
            .filter(n -> n % 2 == 0)  // 짝수
            .map(n -> n * n)           // 제곱
            .collect(Collectors.toList());

        int sum = nums.stream().reduce(0, Integer::sum);

        // groupingBy
        Map<Integer, List<Integer>> groups = nums.stream()
            .collect(Collectors.groupingBy(n -> n % 2)); // 홀짝 분류

        long count = nums.stream().filter(n -> n > 3).count();
        boolean anyBig = nums.stream().anyMatch(n -> n > 5);
    }
}
