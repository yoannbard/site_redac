<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="1.0" encoding="utf-8"/>
<xsl:template match="/TEI">
	<xsl:variable name="transcript"><xsl:value-of select="teiHeader/fileDesc/titleStmt/title"/></xsl:variable>
	<xsl:variable name="extent"><xsl:value-of select="teiHeader/fileDesc/sourceDesc//extent"/></xsl:variable>
	<html>
		<head>
			<title>
				<xsl:value-of select="$transcript"/>
			</title>
			<style type="text/css">
				body {
				  padding: 1em 1em 1em 1em;
				  margin: 0;
				  font-family: sans-serif;
				  font-size: normal;
				  color: black;
				  background: withe;
				  background-position: top left;
				  background-attachment: fixed;
				  background-repeat: no-repeat;
				  text-align: justify;
				}
				td {
    		vertical-align: top;
    		text-align: left;
}
			</style>
		</head>
		<body>
			<h2><xsl:value-of select="$transcript"/> <font size="-3">(<xsl:element name="a">
							<xsl:attribute name="href">
								<xsl:text>../../exploration.html</xsl:text>
							</xsl:attribute>
			<xsl:text>Retour à la page exploration</xsl:text>
			</xsl:element>)</font></h2>
			
			<p><font size="2" color="gray"><xsl:value-of select="teiHeader/fileDesc/sourceDesc/p"/></font></p>
			

			<p><b>Codage des traces écrites</b> :</p>
			<ul>
			<li><s>texte supprimé</s> (rature, effacé, etc.)</li>
			<li>|<sup><u>insertion de texte</u></sup> (marge, sur ligne, etc.)</li>
			<li><font color="gray"><i>transcription incertaine</i></font></li>
			<li><font color="gray"><i><xsl:text>&#9646;</xsl:text></i></font> : espace entre les mots incertain</li>
			<li>passage illisible : <font color="gray"><i>xx</i></font>.</li>
		</ul>
			<p>Chaque ligne correspond à une ligne sur la copie. Les paragraphes identifiés sont séparés d'un espacement.</p>

			<table border="1">
				<tr>
					<td>
						<font color="gray" face="Courier New">
						<xsl:apply-templates select="text/front"/>
						</font>
					</td>
				<td>
					<table>
				<tr style="background: #F5F6CE">
				<xsl:for-each select="teiHeader/profileDesc/settingDesc/setting/*">
					<td ><font face="Courier New"><xsl:value-of select="."/></font></td>
				</xsl:for-each>
				</tr>
			</table>
				</td></tr>
				<tr>
				<td width="50%">
					<xsl:attribute name="name">copie</xsl:attribute>
					<xsl:apply-templates select="text/body"/>

					<p>
						<xsl:element name="a">
						<xsl:attribute name="href">../html_normalise/<xsl:value-of select="$transcript"/>_N.html</xsl:attribute>
						<xsl:text>Lien vers la version normalisée.</xsl:text>						
					</xsl:element>
				</p>
				</td>
				<td>
					<xsl:if test="$extent &gt;1">
						<xsl:element name="img">
							<xsl:attribute name="src">
								<xsl:text>../scans/</xsl:text>
								<xsl:choose>
								<xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
								</xsl:when>
								<xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="$transcript" />
								</xsl:otherwise>
								</xsl:choose>
								<xsl:text>-P1_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>-P2_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>				
				</xsl:if>
				<xsl:if test="$extent =3">	
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>-P3_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>	
					</xsl:if>
					<xsl:if test="$extent =4">
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>-P4_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>
					</xsl:if>
					<xsl:if test="$extent =5">
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>-P5_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>
				</xsl:if>
				<xsl:if test="$extent =6">
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>-P6_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>
					</xsl:if>
				<xsl:if test="$extent =1">		
					<xsl:element name="img">
						<xsl:attribute name="src">
							<xsl:text>../scans/</xsl:text>
							<xsl:choose>
							  <xsl:when test="contains($transcript,'_T.xml')">
									<xsl:value-of select="substring-before($transcript,'_T.xml')" />
							  </xsl:when>
							  <xsl:when test="contains($transcript,'.xml')">
									<xsl:value-of select="substring-before($transcript,'.xml')" />
							  </xsl:when>
							  <xsl:otherwise>
									<xsl:value-of select="$transcript" />
							  </xsl:otherwise>
							</xsl:choose>
							<xsl:text>_S.png</xsl:text>
							</xsl:attribute> 
						<xsl:attribute name="width">
							<xsl:text>100%</xsl:text>
						</xsl:attribute> 					
					</xsl:element>
				</xsl:if>
					
				</td>
				</tr>
				
				<tr>
					<td>
						<xsl:apply-templates select="text/back"/>
					</td>
				<td>
					<font color="gray">Si vous voyez une erreur dans la transcription, merci d'envoyer un mail à 

					<xsl:element name="a">
						<xsl:attribute name="href">
							<xsl:text>mailto:hodac@univ-tlse2.fr</xsl:text>
						</xsl:attribute>
						<xsl:text>hodac@univ-tlse2.fr</xsl:text>						
					</xsl:element>
					</font>
				</td>
				</tr>
			</table>
		</body>
	</html>
</xsl:template>

<xsl:template match="head">
		<h1><xsl:apply-templates/></h1>		
</xsl:template>

<xsl:template match="p">
		<p style="margin-top: 3%;"><xsl:apply-templates/></p>
</xsl:template>

<xsl:template match="lb">
		<br/>
</xsl:template>

<xsl:template match="pb">
		<br/><font size="3" color="gray"><i>------- nouvelle page -------</i></font><br/>
</xsl:template>

<xsl:template match="figure">
		<br/><font size="3" color="gray"><i>------- dessin de l'élève -------</i></font><br/>
</xsl:template>

<xsl:template match="del">
		<s><xsl:apply-templates/></s>
</xsl:template>

<xsl:template match="add">
		|<sup><u><xsl:apply-templates/></u></sup>
</xsl:template>

<xsl:template match="hi">
		|<u><xsl:apply-templates/></u>
</xsl:template>

<xsl:template match="unclear">
	<font color="gray"><i>
	<xsl:choose>
		<xsl:when test=". = ' '">
			<xsl:text>&#9646;</xsl:text>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates/>
		</xsl:otherwise>
	</xsl:choose>
	</i></font>
</xsl:template>

<xsl:template match="surface/zone">
	<font size="2" face="Courier New" style="background: #F5F6CE"><xsl:apply-templates/></font>
</xsl:template>

<xsl:template match="gap">
	<font color="gray"><i>xx</i></font>
</xsl:template>

<xsl:template match="space">
	&#160;
	&#160;
	&#160;
</xsl:template>


<xsl:template match="metamark">
	<font color="gray" face="Courier New">- <xsl:apply-templates/></font>
</xsl:template>	

	
</xsl:stylesheet>
