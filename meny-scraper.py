import requests
from bs4 import BeautifulSoup
import json


def finn_tagger(html_data, tag_navn):
    soup = BeautifulSoup(html_data, 'html.parser')
    tagger = soup.find_all(tag_navn)
    return tagger

def hent_meny(tagger, kantine):
    dager = []
    meny = []
    counter = 0
    for tag in tagger:
        if tag.text == 'Mandag' or tag.text == 'Tirsdag' or tag.text == 'Onsdag' or tag.text == 'Torsdag' or 'Fredag' in tag.text:
            dager.append({ 'text': "{0}".format(tag.text), 'index': counter})
        counter = counter + 1

    for dag in dager:
        meny.append({dag['text']: {'meny': tagger[dag['index'] + 1].text[5:], 'kantine': kantine}})#text[5:] fjerner ordet lunsj fra menyen

    return  meny

# Eksempelbruk:
url = [{'kantine': 'Bright', 'url': 'https://mustadkantine.no/brightcafe'}, {'kantine': 'Kroken', 'url': 'https://mustadkantine.no/kafekroken'}]

meny = []

for u in url: 
    response = requests.get(u['url'])
    html_data = response.text

    tagger = finn_tagger(html_data, ['h1', 'h3', 'p'])
    tmp = hent_meny(tagger, u['kantine'])
    meny.append(tmp)

print(meny)
with open('menytest.json', 'w') as fil:
    json.dump(meny, fil)