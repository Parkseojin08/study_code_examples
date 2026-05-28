// 추상 클래스 - 직접 인스턴스 생성 불가
abstract class Shape {
    protected String color;

    Shape(String color) { this.color = color; }

    abstract double area();

    void print() {
        System.out.printf("[%s] 넓이=%.2f%n", getClass().getSimpleName(), area());
    }
}

class Circle extends Shape {
    private double radius;

    Circle(double radius) { super("red"); this.radius = radius; }

    @Override
    double area() { return Math.PI * radius * radius; }
}

// 인터페이스 - 여러 개 구현 가능
interface Flyable {
    void fly();
    default void land() { System.out.println("착륙"); }
}

interface Swimmable {
    void swim();
}

class Duck extends Shape implements Flyable, Swimmable {
    Duck() { super("yellow"); }

    @Override double area() { return 0; }
    @Override public void fly()  { System.out.println("오리가 난다"); }
    @Override public void swim() { System.out.println("오리가 헤엄친다"); }
}

// 캡슐화 + 생성자
class User {
    private String name;
    private int age;

    User(String name, int age) {
        this.name = name;
        this.age  = age;
    }

    // 생성자 오버로딩
    User(String name) { this(name, 0); }

    public String getName() { return name; }
    public void setAge(int age) {
        if (age < 0) throw new IllegalArgumentException("나이 0 이상");
        this.age = age;
    }

    @Override
    public String toString() { return name + "(" + age + ")"; }
}

public class OOP {
    public static void main(String[] args) {
        // 다형성
        Shape[] shapes = { new Circle(5), new Circle(3) };
        for (Shape s : shapes) s.print();

        // instanceof (Java 16+ 패턴 매칭)
        for (Shape s : shapes) {
            if (s instanceof Circle c) {
                System.out.println("원임");
            }
        }

        // 인터페이스
        Duck duck = new Duck();
        duck.fly();
        duck.swim();
        duck.land(); // default 메서드

        // 객체 생성
        User u1 = new User("홍길동", 25);
        User u2 = new User("이순신"); // 오버로딩
        System.out.println(u1);
    }
}
