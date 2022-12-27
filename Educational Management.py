import json

def load_institutions():
    with open('institutions.json', 'r') as f:
        return json.load(f)

def save_institutions(institutions):
    with open('institutions.json', 'w') as f:
        json.dump(institutions, f)

def add_institution(name, location, type, other_info):
    institutions = load_institutions()
    institutions.append({
        'name': name,
        'location': location,
        'type': type,
        'other_info': other_info
    })
    save_institutions(institutions)

def get_institution(name):
    institutions = load_institutions()
    for institution in institutions:
        if institution['name'] == name:
            return institution

def update_institution(name, new_location, new_type, new_other_info):
    institutions = load_institutions()
    for institution in institutions:
        if institution['name'] == name:
            institution['location'] = new_location
            institution['type'] = new_type
            institution['other_info'] = new_other_info
    save_institutions(institutions)

def delete_institution(name):
    institutions = load_institutions()
    institutions = [i for i in institutions if i['name'] != name]
    save_institutions(institutions)

# Driver code

# Add a new institution
add_institution('Institution A', 'City A', 'Primary', 'Other info')

# Get information about an institution
institution = get_institution('Institution A')
print(institution)

# Update the information about an institution
update_institution('Institution A', 'City B', 'Secondary', 'Updated other info')

# Get updated information about the institution
institution = get_institution('Institution A')
print(institution)

# Delete an institution
delete_institution('Institution A')

# Try to get information about the deleted institution
institution = get_institution('Institution A')
print(institution)
