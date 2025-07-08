package com.ubtechinc.cruzr.userverify.aidl; 
 interface Security {  
 	long getAdminiUserID(); 
   	int getAdminiMode();
	boolean exitAdmini();
	boolean setPassword(String password);
	String getPassword();
	void setModel(String id, int mode, long userid);
	void changeVerifyMode(String packagename, int mode);
 }