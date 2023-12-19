public class ReverseString {
    public static void main(String[] args) {
        String input = "Hello, World!";
        String reversed = "";
        
        // Iterate through the input string in reverse order
        for (int i = input.length() - 1; i >= 0; i--) {
            reversed += input.charAt(i);
        }
        
        // Print the reversed string
        System.out.println(reversed);
    }
}