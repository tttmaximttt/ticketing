k8s-create-secret:
	kubectl create secret generic jwt-secret --from-literal=jwt=local
