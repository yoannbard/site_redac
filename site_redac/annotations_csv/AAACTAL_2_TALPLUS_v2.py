#!/usr/bin/python
# -*-coding:utf-8-*-
"""
#auteur : Lydia-Mai Ho-Dac
#date : 8 juillet 2019
#projet E:Calm

#fonction : génération d'un fichier csv depuis un fichier issu de l'analyse Talismane dans laquelle les erreurs et ratures ont été localisées dans des colonnes supplémentaires
#ajouter les annotations des maillons

numTok	tok	lem	POS	POS	morph	gouv	rel	gouv	rel fichier	numPhrase	ofsetDebutPhrase	numPhrase	ofsetFinPhrase	tempsVerbal	ofsetDebutTexte	ofsetFinTexte	rature	ofsetRature	err	original	ofsetErreur/Rature
1	Une	une	DET	DET	n=s|g=f	2	det	2	det	CE2/EC-CE2-2016-VRX-D1-R3-V1_normalised.ac	1	1	1	4	_	1	4	_	_	_	_
2	dame	dame	NC	NC	n=s|g=f	3	suj	3	suj	CE2/EC-CE2-2016-VRX-D1-R3-V1_normalised.ac	1	5	1	9	_	5	9	_	_	_	_
3	habitait	habiter	V	V	n=s|t=I|p=3	0	root	0	root	CE2/EC-CE2-2016-VRX-D1-R3-V1_normalised.ac	1	10	1	18	imparfait	10	18	_	_	_	_
4	à	à	P	P		3	mod	3	mod	CE2/EC-CE2-2016-VRX-D1-R3-V1_normalised.ac	1	19	1	20	_	19	20	_	_	_	_
5	Tombouctout	_	NC	NC		4	prep	4	prep	CE2/EC-CE2-2016-VRX-D1-R3-V1_normalised.ac	1	21	1	32	_	21	32	_	_	Err	tombouctout	21-32

#entrée : 
#fichiers .tal générés en sortie de la commande Talismane suivante : 
 java -Xmx4G -Dconfig.file=talismane-fr-5.0.4.conf -jar talismane-core-5.1.2.jar --analyse --encoding=UTF8 --logConfigFile=logback-minimal.xml --blockSize=5000 --beamWidth=2 --propagateBeam=True --sessionId=fr --textAnnotators=pattern-XML.txt --builtInTemplate=with_location --inFile=/media/mai/newhome/PROJETS/ecalm/e-CALM_corpusResolco/Corpus_normalise/transcriptionsNormees_nov2019 --outFile=/media/mai/newhome/PROJETS/ecalm/e-CALM_corpusResolco/Corpus_normalise/transcriptionsNormees_nov2019 --suffix=.tal
#fichiers .aa de la version corrigée où les corrections ont été annotées et associées à la version orginale  
 
#sortie : fichiers .csv
#commande : 
#python3 ECalmtei2glozz.py $dirAa $dirTal $dirOut
#$dirAa = chemin du dossier contenant les fichiers coref.aa
#$dirTal = chemin du dossier contenant les fichiers .tal correspondants
#$dirOut = chemin du dossier dans lequel les fichiers .csv générés seront stockés
#ex : 
#python3 AnnotationsInTal.py coref tal coref
"""

import sys
import glob
import os
import re
from lxml import etree
import csv

dirAa=sys.argv[1]+"**/**/copiesAnnotees/annotations/"
dirCsv=sys.argv[2]

#si l'argument (le nom du dossier) ne fini pas par le "/", l'ajouter
if dirAa[-1] != "/":
	dirAa = dirAa + "/"

print("traitement des fichiers contenus dans les dossiers "+dirAa)

if dirCsv[-1] != "/":
	dirCsv = dirCsv + "/"
if not os.path.exists(dirCsv):
	os.mkdir(dirCsv)

#fonction pour trier les unités extraites dans le .aa
def getkeyStart(elem):
    return float(elem.find('positioning/start/singlePosition').get('index'))
    
for aaFile in glob.glob(dirAa+"/*.aa"):
	print("traitement du fichier "+aaFile)
	pathTAL=re.sub(r'^(.*)\/copiesAnnotees\/annotations\/((EC|CO|UN)[^\/]+\-R[0-9]+\-V[123]\_N).*$',r"\1",aaFile)
	idTexte= re.sub(r"^.*\/((EC|CO|UN)[^\/]+\-R[0-9]+\-V[123]\_N).*$",r"\1",aaFile)
	print(idTexte)
	fichier = pathTAL+"/copiesNormees/tal/"+idTexte+'.tal'
	print("et du fichier "+fichier)
	print("---------\n")
	newFile = dirCsv+idTexte+'_withAnnotations.csv'
	outFile = open(newFile, mode="w")
	out=csv.writer(outFile, delimiter='\t')
	annots=[]
	print("parsing du fichier "+aaFile)
	#lecture du fichier .aa correpondant et mémorisation des offset des annotations : éléments mod, err_orthographe et annotations de la coref (/!\ l'offset entre Talismane et les .aa est différent de 1)	
	aa = etree.parse(aaFile)
	root = aa.getroot()
	units = root.findall('unit')
	#tri des "Units" par leur offset de fin
	units[:] = sorted(units, key=getkeyStart)	
	for element in units:
		typUnit = element.find('characterisation/type')

		if typUnit.text == "phraseConsigne":
			if feature is not None:		
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":"consigne",
					"typ":"consigne"
				})
		elif typUnit.text == "mod":
			feature = element.find('characterisation/featureSet/feature[@name="nature"]')
			if feature is not None:		
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":str(feature.text),
					"typ":"modif"
				})
		elif typUnit.text == "Err_Orthographe":
			feature = element.find('characterisation/featureSet/feature[@name="version originale"]')
			if feature is not None:				
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				alt = ""
				if element.find('characterisation/featureSet/feature[@name="correction_2"]').text is not None: 
					alt = " -- alternatives : "+element.find('characterisation/featureSet/feature[@name="correction_2"]').text
				if element.find('characterisation/featureSet/feature[@name="correction_3"]').text is not None: 
					alt = alt+" OR "+element.find('characterisation/featureSet/feature[@name="correction_3"]').text
				if element.find('characterisation/featureSet/feature[@name="correction_4"]').text is not None: 
					alt = alt+" OR "+element.find('characterisation/featureSet/feature[@name="correction_4"]').text
				annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":str(feature.text)+alt,
					"typ":"ortho"
				})
		elif typUnit.text == "maillon_Elle":
			feature = element.find('characterisation/featureSet/feature[@name="groupe"]')
			incertitudeD = element.find('characterisation/featureSet/feature[@name="incertitude sur la délimitation"]')
			incertitudeR = element.find('characterisation/featureSet/feature[@name="incertitude sur le rattachement"]')
			if feature is not None:		
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":"G"+feature.text+"_incertD"+incertitudeD.text+"_incertR"+incertitudeR.text,
					"typ":"maillonElle"
				})		
		elif typUnit.text == "maillon_Il":
			feature = element.find('characterisation/featureSet/feature[@name="groupe"]')
			incertitudeD = element.find('characterisation/featureSet/feature[@name="incertitude sur la délimitation"]')
			incertitudeR = element.find('characterisation/featureSet/feature[@name="incertitude sur le rattachement"]')
			if feature is not None:		
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":"G"+feature.text+"_incertD"+incertitudeD.text+"_incertR"+incertitudeR.text,
					"typ":"maillonIl"
				})		
		elif typUnit.text == "maillon_lesEnfants":
			feature = element.find('characterisation/featureSet/feature[@name="groupe"]')
			incertitudeD = element.find('characterisation/featureSet/feature[@name="incertitude sur la délimitation"]')
			incertitudeR = element.find('characterisation/featureSet/feature[@name="incertitude sur le rattachement"]')
			if feature is not None:		
				startPosition = element.find('positioning/start/singlePosition')
				endPosition = element.find('positioning/end/singlePosition')
				ofsStart = int(startPosition.get('index'))
				ofsEnd = int(endPosition.get('index'))
				membre=str(element.find('characterisation/featureSet/feature[@name="commentaire"]').text)
				if "membre" in membre:
					annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":"G"+feature.text+"_incertD"+incertitudeD.text+"_incertR"+incertitudeR.text,
					"typ":"maillonMembreLesEnfants"
				})
				else:
					annots.append({
					"start":ofsStart+1,
					"end":ofsEnd+1,
					"txt":"G"+feature.text+"_incertD"+incertitudeD.text+"_incertR"+incertitudeR.text,
					"typ":"maillonLesEnfants"
				})

	
	ofsMore = 0
	lastOfs = 0
	para=1
	for l in open(fichier):
		l=l.rstrip("\n")
		tal = l.split("\t")
		if re.search(r"^[0-9]+",tal[0]): # si la première valeur est un nombre alors la ligne correspond à l'analyse d'un token
			if re.search(r"\|t=([A-Z],)?P(,[A-Z])?\|",tal[5]):
				l=l+"\tpresent"
			elif re.search(r"\|t=([A-Z],)?I(,[A-Z])?\|",tal[5]):
				l=l+"\timparfait"
			elif re.search(r"\|t=J\|",tal[5]):
				l=l+"\tpasseSimple"
			elif tal[3] == "V":
				l=l+"\tautreTemps"
			else:
				l=l+"\t_"
				
			if re.search(r"^[0-9]+",tal[12]) and re.search(r"^[0-9]+",tal[14]): #si les ofsets sont renseignés
				if int(tal[13]) > para: # Talisamne redémarre le compteur des ofset à 1 à chaque nouveau paragraph 
					ofsMore = lastOfs -1
					print("ajout de "+str(ofsMore)+" aux ofs")
					print("changement de paragraphe de :"+str(para)+" à "+str(tal[13]))
					para=int(tal[13])
				ofsStart = int(tal[12]) + ofsMore	
				ofsEnd = int(tal[14]) + ofsMore	
				consigne = "\t_" # variable qui indique si le token est dans une des phrases consigne
				mod = "\t_\t_" # variable mod contient 2 valeurs indiquant le type de modification dans laquelle est inclu le token et l'ofset (pour comparer)
				err = "\t_\t_\t_" # variable err contient 2 valeurs séparées par une tabulation et qui sera coller à la fin de la ligne pour chaque token. La valeur 1 indique si le token est inclu dans une erreur (1)  et la valeur 2 fournit le texte original (avant normalisation orthographique)
				elle = "\t_\t_" # variable elle contient 1 valeur indiquant si le token est inclu dans un maillon Elle. La valeur indique si c'est un groupe, s'il y a eu incertitude avec la syntaxe : (is|in)GOui_incertDOui_incertRNon. Is correspond aux token qui sont un maillon. In pour les token qui sont contenus dans un maillon.
				il = "\t_\t_" # idem pour les maillons Il
				lesenf = "\t_\t_" # idem pour les maillons Les Enfants
				membre="\t_\t_"
				for i in range(0, len(annots)):
					ofset = str(annots[i]["start"])+"-"+str(annots[i]["end"])
#					print(annots[i]["typ"]+annots[i]["txt"]+ofset)
			#3 situations, la sortie distingue les cas où l'annotation est le token (is_maillonElle) des cas où le token est inclus dans une annotation (in_maillonElle)  (peut être utiliser le système BIO : Begin, inside, outside)
					if ofsStart == annots[i]["start"] and ofsEnd == annots[i]["end"]:#si le token est une annotation
						if annots[i]["typ"] == "ortho":
							err = "\tErr\t"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "modif":
							mod = "\tis"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonElle":
							elle = "\tis_"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonIl":
							il = "\tis_"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonLesEnfants":
							lesenf = "\tis_"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "maillonMembreLesEnfants":
							membre = "\tis_"+annots[i]["txt"]+"\t"+ofset								
					elif ofsStart >= annots[i]["start"] and ofsEnd <= annots[i]["end"]:#si le token est inclus dans une annotation
						if annots[i]["typ"] == "consigne":
							consigne = "\tconsigne"
						elif annots[i]["typ"] == "ortho":
							err = "\tErr\t"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "modif":
							mod = "\tin_"+annots[i]["txt"]+"\t"+ofset											
						elif annots[i]["typ"] == "maillonElle":
							elle = "\tin_"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonIl":
							il = "\tin_"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonLesEnfants":
							lesenf = "\tin_"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "maillonMembreLesEnfants":
							membre = "\tin_"+annots[i]["txt"]+"\t"+ofset								

					elif ofsStart <= annots[i]["start"] and ofsEnd >= annots[i]["end"]:#si le token inclut une annotation
						if annots[i]["typ"] == "ortho":
							err = "\tErr\t"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "modif":
							mod = "\t"+annots[i]["txt"]+"\t"+ofset											
						elif annots[i]["typ"] == "maillonElle":
							elle = "\t"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonIl":
							il = "\t"+annots[i]["txt"]+"\t"+ofset								
						elif annots[i]["typ"] == "maillonLesEnfants":
							lesenf = "\t"+annots[i]["txt"]+"\t"+ofset
						elif annots[i]["typ"] == "maillonMembreLesEnfants":
							membre = "\t"+annots[i]["txt"]+"\t"+ofset	

				output=l+"\t"+str(ofsStart)+"\t"+str(ofsEnd)+consigne+mod+err+elle+il+lesenf+membre
				output=output.split("\t")
				out.writerow(output)
				lastOfs = ofsEnd	
			else:
				output=l+"\t"+str(ofsStart)+"\t"+str(ofsEnd)+"\t_\t_\t_\t_\t_\t \t \t \t \t "
				output=output.split("\t")
				out.writerow(output)
				lastOfs = ofsEnd	
		elif l == "":
			out.writerow("\n")
	annots.clear
print("Les fichiers csv générés sont dans le dossier "+dirCsv)
