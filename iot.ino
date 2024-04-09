#include <Servo.h>

Servo esc_signal;
#define trigPin1 3
#define echoPin1 4
#define trigPin2 8
#define echoPin2 9
int maximumRange = 10; 
int minimumRange = 1; 
long duration1, distance1; 
long duration2, distance2; 
bool objectDetected = false; 

void setup()
{
  esc_signal.attach(12);  
  esc_signal.write(30);
  delay(3000);
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  Serial.begin(9600);
}

void loop()
{
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  distance1 = duration1 / 58.2;

  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distance2 = duration2 / 58.2;

  if ((distance1 <= maximumRange && distance1 >= minimumRange) || (distance2 <= maximumRange && distance2 >= minimumRange)) {
    objectDetected = true;
    Serial.println("Object detected");
  } else {
    objectDetected = false;
    Serial.println("No object detected");
  }

  if (objectDetected) {
    unsigned long startTime = millis();
    while (millis() - startTime <= 6000) {
      esc_signal.write(110);
    }
    esc_signal.write(30); // Stop the motor
  }

  delay(25);
}