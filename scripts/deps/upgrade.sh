#! /bin/bash

# upgrades all packages in package.json (dependencies & devDependencies)

dep_str() {
  local dep="dependencies"
  echo "$dep"
}

dev_dep_str() {
  local devDep="devDependencies"
  echo "$devDep"
}

jq_keys() {
  local packageJsonPath="./package.json"
  if command -v jq &>/dev/null; then
    cat "${packageJsonPath}" | jq ".$1 | keys"
  else
    echo "command 'jq' could not be found. Visit https://jqlang.github.io/jq/ to download or install jq via package manager."
    exit
  fi
}

loop_dependencies() {
  formated=()
  local -n dependencies="$1"
  for dep in ${dependencies[@]}; do
    replaced=$(echo "$dep" | perl -lpe 's/(\"|\,|\[|\])//g')
    [[ ! -z "$replaced" ]] && formated+=("$replaced@latest")
  done
  echo "${formated[*]}"
}

command_str() {
  local latest="$1"
  local depType="$2"
  local flag=""
  if [[ "$depType" == "$(dep_str)" ]]; then
    flag="-S"
  fi
  if [[ "$depType" == "$(dev_dep_str)" ]]; then
    flag="-D"
  fi
  local command="npm install $flag $latest"
  echo "$command"
}

init() {
  local packageJsonKeys=("$(dep_str)" "$(dev_dep_str)")
  for i in ${packageJsonKeys[@]}; do
    local deps=$(jq_keys "${i}")
    local latest=$(loop_dependencies deps)
    local command=$(command_str "${latest}" "${i}")
    printf "\n"
    printf "installing ${i}...\n\n"
    eval "$command"
    printf "\n\n"
  done
}

init
