#!/usr/bin/python
# -*-coding:utf-8-*-
import sys
import glob
import lxml.etree as ET
import lxml.html
import re

dossier=sys.argv[1]+"**/**/transcriptions/"
xslFile=sys.argv[2]
print("lecture du dossier "+dossier)
for fichier in glob.glob(dossier+"/*.xml"):
	print("lecture du fichier "+fichier)
	xml = ET.parse(fichier)
	xslt = ET.parse(xslFile)
	transform = ET.XSLT(xslt)
	html = transform(xml)
	idTexte=re.sub(r"^.*\/((EC|CO|UN)[^\/]+\-R[0-9]+\-V[123]).*$",r"\1",fichier)
	if "coref" in xslFile:
		htmlFile = "../copies/html_normalise/"+idTexte+"_N.html"
	else:
		htmlFile = "../copies/html_transcript/"+idTexte+"_N.html"

	out = open(htmlFile,'w')
#	htmlBis = ET.tostring(html, pretty_print=True)
#	print(ET.tostring(html, pretty_print=True))
	out.write(str(html))
	print("htmlFile générée")
	out.close()
