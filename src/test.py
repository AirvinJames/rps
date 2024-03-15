import random

player_moves_history = []
possible_moves = ['rock', 'paper', 'scissors']
move_frequencies = {}

def get_player_move():
    return input("Enter your move (rock, paper, or scissors) or press Enter to quit: ").lower()

def update_player_moves_history(player_move):
    player_moves_history.append(player_move)

def get_last_player_move():
    return player_moves_history[-1]

def get_possible_moves_after_last_move(last_player_move):
    return [move for move in possible_moves if (last_player_move, move) in move_frequencies]

def select_move_with_highest_frequency(possible_moves):
    max_frequency = max(move_frequencies[(get_last_player_move(), move)] for move in possible_moves)
    return random.choice([move for move in possible_moves if move_frequencies[(get_last_player_move(), move)] == max_frequency])

def select_random_move():
    return random.choice(possible_moves)

def store_ai_guess(informed_guess):
    if (get_last_player_move(), informed_guess) in move_frequencies:
        move_frequencies[(get_last_player_move(), informed_guess)] += 1
    else:
        move_frequencies[(get_last_player_move(), informed_guess)] = 1

def display_ai_guess(informed_guess):
    print("AI guessed:", informed_guess)

while True:
    player_move = get_player_move()
    if not player_move:
        break
    update_player_moves_history(player_move)
    
    if len(player_moves_history) > 1:
        last_player_move = get_last_player_move()
        possible_moves_after_last_move = get_possible_moves_after_last_move(last_player_move)
        
        if len(possible_moves_after_last_move) > 0:
            informed_guess = select_move_with_highest_frequency(possible_moves_after_last_move)
        else:
            informed_guess = select_random_move()
    else:
        informed_guess = select_random_move()
    
    store_ai_guess(informed_guess)
    display_ai_guess(informed_guess)