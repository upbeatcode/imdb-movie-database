import json

# This script transforms ratings data from ratings.json to data.js.
# To run it, navigate to the repository root in your terminal and execute:
# python src/assets/process_ratings.py
#
# It will overwrite the existing src/assets/data.js with the processed data.

def transform_ratings(input_filepath="src/assets/ratings.json", output_filepath="src/assets/data.js"):
    """
    Transforms ratings data from a JSON file to a JavaScript module.

    Args:
        input_filepath (str): Path to the input JSON file (ratings.json).
        output_filepath (str): Path to the output JavaScript file (data.js).
    """
    try:
        with open(input_filepath, 'r', encoding='utf-8') as f:
            ratings_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Input file not found at {input_filepath}")
        return
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {input_filepath}")
        return

    transformed_data = []
    for item in ratings_data:
        # Handle potential missing keys gracefully
        const = item.get("Const")
        your_rating = item.get("Your Rating")
        date_rated = item.get("Date Rated")
        title = item.get("Title")
        imdb_rating = item.get("IMDb Rating")
        runtime_mins = item.get("Runtime (mins)")
        year = item.get("Year")
        genres_str = item.get("Genres")
        num_votes = item.get("Num Votes")
        release_date = item.get("Release Date")
        directors_str = item.get("Directors")

        # Apply transformations
        genres_list = [genre.strip() for genre in genres_str.split(',')] if genres_str else []
        
        # Runtime: use 0 if missing or not a number
        runtime = 0
        if isinstance(runtime_mins, (int, float)):
            runtime = runtime_mins
        elif isinstance(runtime_mins, str) and runtime_mins.isdigit():
            runtime = int(runtime_mins)
        
        # Directors: ensure it's always an array of strings
        directors_list = [d.strip() for d in directors_str.split(',')] if directors_str else []
        
        transformed_item = {
            "id": const,
            "myRating": your_rating,
            "dateRated": date_rated, # Changed from dataRated
            "title": title,
            "imdbRating": imdb_rating,
            "runtime": runtime, # Use 0 if missing
            "year": year,
            "genres": genres_list,
            "numVotes": num_votes,
            "releaseDate": release_date,
            "directors": directors_list  # Now always an array
        }
        transformed_data.append(transformed_item)

    # Prepare the JavaScript output string
    js_output = "export const data = [\n"
    for i, entry in enumerate(transformed_data):
        js_output += "  {\n"
        for key, value in entry.items():
            js_output += f"    {key}: {json.dumps(value, ensure_ascii=False)},\n"
        js_output += "  }"
        if i < len(transformed_data) - 1:
            js_output += ",\n"
        else:
            js_output += "\n"
    js_output += "];\n"

    try:
        with open(output_filepath, 'w', encoding='utf-8') as f:
            f.write(js_output)
        print(f"Successfully transformed data to {output_filepath}")
    except IOError:
        print(f"Error: Could not write to output file {output_filepath}")

if __name__ == "__main__":
    # Example usage:
    # Ensure this script is run from the root of the repository,
    # or adjust filepaths accordingly.
    transform_ratings()
