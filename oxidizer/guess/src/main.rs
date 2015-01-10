use std::io;
use std::cmp::Ordering;
use std::rand;

fn main() {

	let prompt = "I'm thinking of a number between 0 and 10, inclusive. Guess!";
	let mut answer: uint = rand::random() % 11u;

	loop {
		// intro
		println!("Do you want to play a game? (y/n)");
		let input = io::stdin().read_line().ok().expect("Failed to read line");

		// keep going?
		match input.as_slice() {
			"y\n" => (),
			"n\n" => {
					println!("Goodbye!");
					break;
				},
			_     => {
					println!("I didn't catch that");
					continue;
				},
		}

		// let's go!
		println!("Excellent! Let's begin!\n{}", prompt);
		answer = (answer + 3) % 11;

		loop {
			let guess = io::stdin().read_line().ok().expect("Failed to read line");
			let guess_num = guess.parse::<uint>();
			match cmp(guess_num, answer) {
				Ordering::Less    => println!("Too low. Guess again."),
				Ordering::Greater => println!("Too high. Guess again."),
				Ordering::Equal   => {
					println!("Correct! Well done!");
					break;
				},
			}
		}
	}
}

fn cmp(a: uint, b: uint) -> Ordering {
	if a < b { Ordering::Less }
	else if a > b { Ordering::Greater }
	else { Ordering::Equal }
}
