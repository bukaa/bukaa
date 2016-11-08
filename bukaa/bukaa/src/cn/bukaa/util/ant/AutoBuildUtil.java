package cn.bukaa.util.ant;

import java.io.File;
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.Task;
import org.apache.tools.ant.taskdefs.Copy;

public class AutoBuildUtil extends Task {
	
	public void execute() throws BuildException{
		 Project project = getProject();
		 String buildFiles = project.getProperty("build_files");
		 File basedir = project.getBaseDir();
		 //String projectName = project.getName();
		    
		 String tomcatHome = project.getProperty("tomcat.home");
		 String webappName = project.getProperty("webapp.name");
		    
		 String[] fromDirPaths = { "WebRoot/", "WebRoot/WEB-INF/classes/", "etc/classes" };
		 String[] toDirPaths = { tomcatHome + "/" + "webapps" + "/" + webappName + "/", 
		      tomcatHome + "/" + "webapps" + "/" + webappName + "/WEB-INF/classes/", tomcatHome + "/" + "webapps" + "/" + webappName + "/WEB-INF/classes/" };
		   
		 String[] buildFilePathArr = buildFiles.split(" ");
		 
		 String basedirAbsolutePath = basedir.getAbsolutePath();
		 String[] arrayOfString1;
		 int j = (arrayOfString1 = buildFilePathArr).length;
		 for (int i = 0; i < j; i++) {
		      String buildFilePath = arrayOfString1[i];
		      File buildFile = new File(buildFilePath);
		      if (buildFile.exists()) {
		    	  if (!buildFile.isDirectory()){
			          if (buildFilePath.indexOf(basedirAbsolutePath) == 0){
			            buildFilePath = buildFilePath.substring(basedirAbsolutePath.length() + 1);
			            buildFilePath = buildFilePath.replace('\\', '/');
			          }
		          String destDirPath = "";
		          
		          boolean fromDirPathFound = false;
		          for (int k = 0; k < fromDirPaths.length; k++) {
		        	  if (buildFilePath.indexOf(fromDirPaths[k]) == 0){
		            	destDirPath = toDirPaths[k] + buildFilePath.substring(fromDirPaths[k].length());
		            	fromDirPathFound = true;
		            	break;
		        	  }
		          }
		          if (fromDirPathFound)
		          {
		        	  File file = new File(destDirPath);
		        	  File destDir = file.getParentFile();
		        	  if (!destDir.exists()) {
		        		  destDir.mkdirs();
		        	  }
		        	  Copy copy = new Copy();
		        	  copy.setTodir(destDir);
		        	  copy.setFile(buildFile);
		        	  copy.execute();
		          	}
		    	  }
		      }
		  }
		  super.execute();
	  }
}