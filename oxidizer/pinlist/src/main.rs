use std::io::BufferedReader;
use std::io::File;

fn main() {
    // setup, read in
    let path = Path::new("./../../../tessel-v2-hardware/tessel-v2.net");
    let mut file = BufferedReader::new(File::open(&path));
    let lines: Vec<String> = file.lines().map(|x| x.unwrap()).collect();

    // we'll need this datatype
    enum Node {
        Cell{ name: String, items: Vec<Node>},
        Atom{ value: String },
    }

    for l in lines.iter() {
        // println!("{}", l.trim());
        println!("{}", l.trim().as_slice()[0]);
    }
}
